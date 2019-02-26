// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/login/loginForm.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html lang=\"en\"><head><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>Bootstrap Simple Login Form</title><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js\"></script><script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js\"></script><style type=\"text/css\">\r\n\t.login-form {\r\n\t\twidth: 340px;\r\n    \tmargin: 50px auto;\r\n\t}\r\n    .login-form form {\r\n    \tmargin-bottom: 15px;\r\n        background: #f7f7f7;\r\n        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);\r\n        padding: 30px;\r\n    }\r\n    .login-form h2 {\r\n        margin: 0 0 15px;\r\n    }\r\n    .form-control, .btn {\r\n        min-height: 38px;\r\n        border-radius: 2px;\r\n    }\r\n    .btn {\r\n        font-size: 15px;\r\n        font-weight: bold;\r\n    }\r\n</style></head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"login-form\"><form action=\"/examples/actions/confirmation.php\" method=\"post\"><h2 class=\"text-center\">Log in</h2><div class=\"form-group\"><input type=\"text\" class=\"form-control\" placeholder=\"Username\" required=\"required\"></div><div class=\"form-group\"><input type=\"password\" class=\"form-control\" placeholder=\"Password\" required=\"required\"></div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-primary btn-block\">Log in</button></div><div class=\"clearfix\"><label class=\"pull-left checkbox-inline\"><input type=\"checkbox\"> Remember me</label></div></form></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "23");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/system-tape-manage$1.0.0/views/login/loginForm.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
