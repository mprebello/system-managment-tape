// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/login/loginForm.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    header_template = marko_loadTemplate(require.resolve("../templates/header.marko")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html lang=\"en\"><head>");

  include_tag({
      _target: header_template
    }, out, __component, "2");

  out.w("</head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"login-form\"><form action=\"/auth\" method=\"post\"><h1 class=\"text-center\">Sistema de Fitas</h1><h2 class=\"text-center\">Log in</h2><div class=\"form-group\"><input type=\"text\" id=\"user\" name=\"user\" class=\"form-control\" placeholder=\"user\" required=\"required\"></div><div class=\"form-group\"><input type=\"password\" id=\"password\" name=\"password\" class=\"form-control\" placeholder=\"password\" required=\"required\"></div><div class=\"form-group\"><button type=\"submit\" class=\"btn btn-primary btn-block\" value=\"login\">Log in</button></div><div><label class=\"form-group\"><a href=\"https://senha.uninet.com.br\">Recuperar Senha</a></label></div></form></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "17");

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
      "../templates/header.marko",
      "marko/src/taglibs/core/include-tag",
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
