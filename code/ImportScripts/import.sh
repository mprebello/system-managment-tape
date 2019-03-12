#!/bin/bash
ARGS="$@"

MAIN () {
  FC_VARIABLES
  FC_GET_INPUT "${ARGS}"
  FC_QUERY

  if [ "${UPDATE_ONLY}" == "ON"  ]
  then
    FC_UPDATE
    exit
  fi

  if [ "${FTP_ONLY}" == "ON"  ]
  then
    FC_FTP
    exit
  fi

  if [ "${EXEC_ALL}" == "ON" ]
  then
    FC_UPDATE
    FC_FTP
  fi
}

function FC_UPDATE {
  FC_CAPTURE_ARCSERVE "${VAR_SERVER1}" "SERVER1"
  FC_CAPTURE_ARCSERVE "${VAR_SERVER2}" "SERVER2"
  FC_CAPTURE_BACULA "${VAR_SERVERBACULA}" "SERVERBACULA"
  FC_UPDATEDB
}

function FC_VARIABLES {
  VAR_SERVER1="arcserve1.server.local"
  VAR_SERVER2="arcserve2.server.local"
  VAR_SERVERBACULA="bacula.server.local"
  #DATABASE VARIABLE
  VAR_DATABASE_BASE="tapelibrary"
  VAR_DATABASE_IP="127.0.0.1"
  VAR_DATABASE_USER="tapelibrary"
  VAR_DATABASE_PASSWORD="password_here"
  MYSQL_EXEC_HTML="mysql -H -s -u${VAR_DATABASE_USER} -p${VAR_DATABASE_PASSWORD} ${VAR_DATABASE_BASE} -e"
  MYSQL_EXEC="mysql -B -s -u${VAR_DATABASE_USER} -p${VAR_DATABASE_PASSWORD} ${VAR_DATABASE_BASE} -e"
  VAR_FILE_IMPORT="/tmp/import.mysql"
  REPORT_CSV="/var/lib/mysql-files/report_tape.csv"
  VAR_INTERVAL_DAYS="1"
  DAY_OF_WEEK="$(date '+%A')"
  DAY_OF_WEEK_NUMBER="$(date '+%U' |awk '{printf "%d\n",$0;}')"
  DAY_OF_WEEK_NUMBER="8"
  FTP_HOST="ftp to capture arcserve report"
  FTP_USER="anonymous"
  FTP_PASSWORD="password ftp gere"
  FTP_DIR="/directory here"

  if [ "$((${DAY_OF_WEEK_NUMBER}%2))" != "1" ]; then
    DAY_OF_WEEK_NUMBERSTATUS="EVENS"
  else
    DAY_OF_WEEK_NUMBERSTATUS="ODDS"
  fi

  rm -f ${VAR_FILE_IMPORT}
  rm -f ${REPORT_CSV}
}

function FC_CAPTURE_ARCSERVE {
  TMP_SERVER="$1"
  TMP_SERVER_NAME="$2"
  TMP_WORK="/tmp/capturenow"

  #CAPTURE AND CONVERT CSVFILE TO ASCII
  wget -O - ftp://${TMP_SERVER}/report_tape.csv 2>>/dev/null|iconv -f utf-16 -t utf-8 | sed '1,/^Serial No/d' >${TMP_WORK} 2>>/dev/null
  TOTAL_LINES="$(wc -l "${TMP_WORK}" | awk '{print$1}')"
  for TMP_LINE_COUNT in $(seq 1 ${TOTAL_LINES})
  do
    TMP_LINE="$(head -n ${TMP_LINE_COUNT} ${TMP_WORK} | tail -n 1)"
    TMP_SERIAL="$(echo "${TMP_LINE}" | awk -F ',' '{print$1}')"
    TMP_MEDIA="$(echo ${TMP_LINE} | awk -F ',' '{print$2}')"
    TMP_POOL="$(echo ${TMP_LINE} | awk -F ',' '{print$3}')"
    TMP_STATUS="$(echo ${TMP_LINE} | awk -F ',' '{print$4}')"

    TMP_PROJECT="NONE"
    TMP_SCRATCHNAME="SCRATCH"
    if [ ${TMP_SERVER_NAME} == "SERVER1" ]
    then
      TMP_PROJECT="SERVER1"
      TMP_SCRATCHNAME="SCRATCH_ARC1"
    fi

    if [ ${TMP_SERVER_NAME} == "SERVER2" ]
    then
      TMP_PROJECT="SERVER2"
      TMP_SCRATCHNAME="SCRATCH_ARC2"
    fi

    if [ "${TMP_STATUS}" == "Scratch Set" ]
    then
      TMP_POOL="${TMP_SCRATCHNAME}"
    fi

    TMP_WRITEDATE_AMERICAN="$(echo ${TMP_LINE} | awk -F ',' '{print$5}')"
    TMP_WRITEDATE="$(FC_CONVERT_DATE_AMERICAN "${TMP_WRITEDATE_AMERICAN}")"
    TMP_RETENTION="$(echo "${TMP_LINE}" | awk -F ',' '{print$6}' | egrep -o '[0-9]+')"
    TMP_EXPIRATION_DATE="$(date -d "${TMP_WRITEDATE} -03 + ${TMP_RETENTION} day" '+%Y-%m-%d %H:%M:%S')"

    echo "INSERT INTO Library ( MediaSerial, MediaName, Pool, ServerName, LastWritten, ExpirationDate, Project ) VALUES(\"${TMP_SERIAL}\",\"${TMP_MEDIA}\",\"${TMP_POOL}\",\"${TMP_SERVER_NAME}\",\"${TMP_WRITEDATE}\",\"${TMP_EXPIRATION_DATE}\",\"${TMP_PROJECT}\");" >>${VAR_FILE_IMPORT}
  done
}

function FC_CAPTURE_BACULA {
  TMP_SERVER="$1"
  TMP_SERVER_NAME="$2"
  TMP_WORK="/var/lib/mysql-files/reportdb.csv"
  rm -f ${TMP_WORK}

  #CONVERT TO FILE
  ${MYSQL_EXEC} "SELECT M.VolumeName as MEDIA,
   M.Comment as LABEL,
   REPLACE(REPLACE(P.name, 'PL_', ''),'-TAPE','') as POOL,
   M.LastWritten as LAST_WRITTEN,
   FROM_UNIXTIME(UNIX_TIMESTAMP(M.LastWritten) + P.VolRetention) as EXPIRATION_DATE
   FROM bacula.Media M,bacula.Pool P
   where
   M.poolid = P.poolid and
   ( P.name like 'PL_%-TAPE' or P.name like 'PL_SCRATCH%' )
   INTO OUTFILE '${TMP_WORK}' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n'
  ;"
  TOTAL_LINES="$(wc -l "${TMP_WORK}" | awk '{print$1}')"

  for TMP_LINE_COUNT in $(seq 1 ${TOTAL_LINES})
  do
  TMP_LINE="$(head -n ${TMP_LINE_COUNT} ${TMP_WORK} | tail -n 1)"
  TMP_SERIAL="$(echo "${TMP_LINE}" | awk -F ',' '{print$1}')"
  TMP_MEDIA="$(echo ${TMP_LINE} | awk -F ',' '{print$2}')"
  TMP_POOL="$(echo ${TMP_LINE} | awk -F ',' '{print$3}')"
  TMP_WRITEDATE="$(echo ${TMP_LINE} | awk -F ',' '{print$4}')"
  TMP_EXPIRATION_DATE="$(echo ${TMP_LINE} | awk -F ',' '{print$5}')"

  TMP_PROJECT="DEFAULT_PROJECT"

  if [ "${TMP_POOL}" == "SCRATCH" ]
  then
  TMP_POOL="SCRATCH"
  fi

  if [ "${TMP_POOL}" == "SCRATCH_PR" ]
  then
  TMP_POOL="SCRATCH_PR2"
  TMP_PROJECT="PR2"
  fi

  if [[ "${TMP_POOL}" == [D,M,S][1,2]ACUX ]]
  then
  TMP_PROJECT="PR2"
  fi


  echo "INSERT INTO Library ( MediaSerial, MediaName, Pool, ServerName, LastWritten, ExpirationDate, Project ) VALUES(\"${TMP_SERIAL}\",\"${TMP_MEDIA}\",\"${TMP_POOL}\",\"${TMP_SERVER_NAME}\",\"${TMP_WRITEDATE}\",\"${TMP_EXPIRATION_DATE}\",\"${TMP_PROJECT}\");" >>${VAR_FILE_IMPORT}

  done
}

function FC_CONVERT_DATE_AMERICAN {
  TMP_DATE="${1}"

  TMP_MONTH="$(echo ${TMP_DATE} | awk -F '/' '{print$1}')"
  TMP_DAY="$(echo ${TMP_DATE} | awk -F '/' '{print$2}')"
  TMP_YEAR="$(echo ${TMP_DATE} | awk -F '/' '{print$3}' | awk '{print$1}')"
  TMP_HOUR="$(echo ${TMP_DATE} | awk -F '/' '{print$3}' | awk '{print$2}')"

  echo "${TMP_YEAR}-${TMP_MONTH}-${TMP_DAY} ${TMP_HOUR}"
}

function FC_UPDATEDB {
  #VALIDATE DATABASE
  #CLEARDATABASE
  ${MYSQL_EXEC} "delete from Library;"
  #INSERTDATABASE
  ${MYSQL_EXEC} "source ${VAR_FILE_IMPORT};"
}

function FC_QUERY {
  TMP_DATE_YESTERDAY_SHORT_SHOW="$(date -d 'yesterday' '+%d/%m/%Y')"
  TMP_DATE_YESTERDAY_INIT="$(date -d 'yesterday' '+%Y-%m-%d') 00:00:00"
  TMP_DATE_YESTERDAY_INIT_SHOW="$(date -d 'yesterday' '+%d/%m/%Y') 00:00:00"
  TMP_DATE_YESTERDAY_END="$(date -d 'yesterday' '+%Y-%m-%d') 23:59:59"
  TMP_DATE_YESTERDAY_END_SHOW="$(date -d 'yesterday' '+%d/%m/%Y') 23:59:59"

  TMP_DATE_SHORT_SHOW="$(date '+%d/%m/%Y')"
  TMP_DATE_INIT="$(date '+%Y-%m-%d') 00:00:00"
  TMP_DATE_INIT_SHOW="$(date '+%d/%m/%Y') 00:00:00"
  TMP_DATE_END="$(date '+%Y-%m-%d') 23:59:59"
  TMP_DATE_END_SHOW="$(date '+%d/%m/%Y') 23:59:59"

  if [ "${DAY_OF_WEEK}" == "Monday" ]
  then
  TMP_DATE_YESTERDAY_SHORT_SHOW="$(date -d 'yesterday' '+%d/%m/%Y')"
  TMP_DATE_YESTERDAY_INIT="$(date -d '3 days ago' '+%Y-%m-%d') 00:00:00"
  TMP_DATE_YESTERDAY_INIT_SHOW="$(date -d '3 days ago' '+%d/%m/%Y') 00:00:00"
  TMP_DATE_YESTERDAY_END="$(date -d 'yesterday' '+%Y-%m-%d') 23:59:59"
  TMP_DATE_YESTERDAY_END_SHOW="$(date -d 'yesterday' '+%d/%m/%Y') 23:59:59"

  TMP_DATE_SHORT_SHOW="$(date '+%d/%m/%Y')"
  TMP_DATE_INIT="$(date -d '2 days ago' '+%Y-%m-%d') 00:00:00"
  TMP_DATE_INIT_SHOW="$(date -d '2 days ago' '+%d/%m/%Y') 00:00:00"
  TMP_DATE_END="$(date '+%Y-%m-%d') 23:59:59"
  TMP_DATE_END_SHOW="$(date '+%d/%m/%Y') 23:59:59"
  fi

  VAR_SUBJECT_MEDIAS_WRITTEN="Medias Gravadas entre ${TMP_DATE_YESTERDAY_INIT_SHOW} e ${TMP_DATE_YESTERDAY_END_SHOW} que devem ser enviadas a retencao"
  VAR_SUBJECT_MEDIAS_WRITTEN_TICKET="ENVIAR MEDIAS ${TMP_DATE_SHORT_SHOW} a retencao"
VAR_SELECT_MEDIAS_WRITTEN="Select MediaSerial as MEDIA,
MediaName as LABEL,
Pool as POOL,
ServerName as SERVERNAME,
Project as Projeto,
LastWritten as LAST_WRITTEN,
ExpirationDate as EXPIRATION,
DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE
From Library where
LastWritten > '${TMP_DATE_YESTERDAY_INIT}' and
LastWritten < '${TMP_DATE_YESTERDAY_END}'
ORDER BY MEDIA ;"

  VAR_SUBJECT_MEDIAS_TOMORROW="Medias que expiram entre entre ${TMP_DATE_INIT_SHOW} e ${TMP_DATE_END_SHOW}e devem ser solicitadas da retencao"
  VAR_SUBJECT_MEDIAS_TOMORROW_TICKET="SOLICITAR MEDIAS ${TMP_DATE_SHORT_SHOW} da retencao"
VAR_SELECT_MEDIAS_TOMORROW="Select MediaSerial as MEDIA,
MediaName as LABEL,
Pool as POOL,
ServerName as SERVERNAME,
Project as Projeto,
LastWritten as LAST_WRITTEN,
ExpirationDate as EXPIRATION,
DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE
From Library where
ExpirationDate > '${TMP_DATE_INIT}' and
ExpirationDate < '${TMP_DATE_END}'
ORDER BY MEDIA ;"

  VAR_SUBJECT_MEDIAS_MOVED="Medias que expiram entre ${TMP_DATE_YESTERDAY_INIT_SHOW} e ${TMP_DATE_YESTERDAY_END_SHOW} e devem ser movidas para SCRATCH"
  VAR_SUBJECT_MEDIAS_MOVED_TICKET="MOVER MEDIAS ${TMP_DATE_YESTERDAY_SHORT_SHOW}"
VAR_SELECT_MEDIAS_MOVED="Select MediaSerial as MEDIA,
MediaName as LABEL,
Pool as POOL,
ServerName as SERVERNAME,
Project as Projeto,
LastWritten as LAST_WRITTEN,
ExpirationDate as EXPIRATION,
DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE
From Library where
ExpirationDate > '${TMP_DATE_YESTERDAY_INIT}' and
ExpirationDate < '${TMP_DATE_YESTERDAY_END}'
ORDER BY MEDIA ;"

  VAR_SUBJECT_MEDIAS_SCRATCH="Medias Liberas para uso"
  VAR_SUBJECT_MEDIAS_SCRATCH_TICKET="VERIFICAR MEDIAS LIBERADAS"
VAR_SELECT_MEDIAS_SCRATCH="SELECT MediaSerial as MEDIA,
MediaName as LABEL,
Pool as POOL,
Project as PROJETO
From Library where
Pool like '%SCRATCH%'
ORDER BY MEDIA;"

VAR_SELECT_MEDIAS_ARCHIVE="SELECT MediaSerial as MEDIAS,
MediaName as LABEL,
Pool as POOL,
ServerName as SERVERNAME,
Project as PROJETO,
LastWritten as LAST_WRITTEN,
ExpirationDate as EXPIRATION,
DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE
From Library where
Pool NOT LIKE '%SCRATCH%'
ORDER BY DAYS_TO_EXPIRE ;"
}

function FC_SENDFTP {
  FTP_FILE="$1"
  FTP_NAME="$2"

ftp -inv ${FTP_HOST} <<EOF
user ${FTP_USER} ${FTP_PASSWORD}
cd ${FTP_DIR}
put ${FTP_FILE} ${FTP_NAME}
bye
EOF
}

function FC_FTP {
  TMP_DATE_YESTERDAY="$(date -d 'yesterday' '+%Y%m%d')"
  TMP_NAME="${TMP_DATE_YESTERDAY}-tapeinventory.csv"
  FC_SENDFTP "${REPORT_CSV}" "${TMP_NAME}"

  TMP_NAME="${TMP_DATE_YESTERDAY}-action.txt"
  FC_SENDFTP "${TICKET_FILE_TMP}" "${TMP_NAME}"
}

function FC_GET_INPUT {
  if [ "$ARGS" == "" ]
  then
    FC_SHOW_HELP
    exit
  fi

  while getopts "urhatof" OPT; do
    case "$OPT" in
    "u") UPDATE_ONLY="ON";;
    "r") REPORT_ONLY="ON";;
    "f") FTP_ONLY="ON";;
    "a") EXEC_ALL="ON";;
    "o") TICKET_ONLY="ON";;
    "h") FC_SHOW_HELP;;
    "?") FC_SHOW_HELP ;;
    esac
  done
}

function FC_SHOW_HELP {
  echo -e "\n-------------------------"
  echo -e "-u update database"
  echo -e "-r report"
  echo -e "-o ticket"
  echo -e "-f send ftp"
  echo -e "-a all"
  echo -e "-h Help Menu"
  echo -e "-------------------------"
  exit
}

MAIN
