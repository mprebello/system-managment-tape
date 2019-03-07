// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/templates/searchScript.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<script>\nfunction searchAllField(){\n  var input, table, tr, td, i, txtValue, field;\n  table = document.getElementById(\"myData\");\n  tr = table.getElementsByTagName(\"tr\");\n  for (i = 0; i < tr.length; i++) {\n    field = tr[i];\n    column_Information_mymedia = validateField(field, 'myInputMediaName');\n    column_Information_myinput = validateField(field, 'myInputSerial');\n    column_Information_myinputpool = validateField(field, 'myInputPool');\n    column_Information_myinputproject = validateField(field, 'myInputProject');\n    column_Information_myinputserver = validateField(field, 'myInputServer');\n    column_Information_myinputrepo = validateField(field, 'myInputRepo');\n\n    if (column_Information_mymedia && column_Information_myinput && column_Information_myinputpool && column_Information_myinputproject && column_Information_myinputserver && column_Information_myinputrepo){\n        tr[i].style.display = \"\";\n      } else {\n        tr[i].style.display = \"none\";\n      }\n    }\n  }\n\nfunction validateField(field, inputField){\n  var input, input_value_upper, field_to_compare, txtValue\n  input = document.getElementById(inputField);\n  input_value_upper = input.value.toUpperCase();\n  switch (inputField) {\n    case 'myInputSerial':\n      field_to_compare = field.getElementsByTagName(\"th\")[0];\n      break;\n    case 'myInputMediaName':\n      field_to_compare = field.getElementsByTagName(\"td\")[0];\n      break;\n    case 'myInputPool':\n      JSON.stringify(input);\n      field_to_compare = field.getElementsByTagName(\"td\")[3];\n      break;\n    case 'myInputServer':\n      field_to_compare = field.getElementsByTagName(\"td\")[4];\n      break;\n    case 'myInputDateWriteIn':\n      field_to_compare = field.getElementsByTagName(\"td\")[5];\n      break;\n    case 'myInputDateWriteOut':\n      field_to_compare = field.getElementsByTagName(\"td\")[5];\n      break;\n    case 'myInputTimeToExpireIn':\n      field_to_compare = field.getElementsByTagName(\"td\")[6];\n      break;\n    case 'myInputTimeToExpireOut':\n      field_to_compare = field.getElementsByTagName(\"td\")[6];\n      break;\n    case 'myInputProject':\n      field_to_compare = field.getElementsByTagName(\"td\")[1];\n      break;\n    case 'myInputRepo':\n      field_to_compare = field.getElementsByTagName(\"td\")[2];\n      break;\n  }\n\n  txtValue = field_to_compare.textContent || field_to_compare.innerText\n  if (txtValue.toUpperCase().indexOf(input_value_upper) > -1){\n    return true;\n  }else{\n    return false;\n  }\n\n}\n\n\nsearchAllField();\n</script>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/system-tape-manage$1.0.0/views/templates/searchScript.marko"
  };
