function searchInSpecificTable(inputField){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById(inputField);
  filter = input.value.toUpperCase();
  table = document.getElementById("myData");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    field = tr[i];
    column_Information_mymedia = validateField(field, 'myInputMediaName');
    column_Information_myinput = validateField(field, 'myInputSerial');
    if (column_Information_mymedia && column_Information_myinput){
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function validateField(field, inputField){
  var input, input_value_upper, field_to_compare, txtValue
  input = document.getElementById(inputField);
  input_value_upper = input.value.toUpperCase();

  switch (inputField) {
    case 'myInputSerial':
      field_to_compare = field.getElementsByTagName("th")[0];
      break;
    case 'myInputMediaName':
      field_to_compare = field.getElementsByTagName("td")[0];
      break;
  }
  txtValue = field_to_compare.textContent || field_to_compare.innerText
  if (txtValue.toUpperCase().indexOf(filter) > -1){
    return true;
  }else{
    return false;
  }

}
