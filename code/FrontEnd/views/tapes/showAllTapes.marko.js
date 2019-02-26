// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/tapes/showAllTapes.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head><link rel=\"stylesheet\" href=\"../../node_modules/bootstrap/dist/css/bootstrap.min.css\"><script src=\"../../node_modules/bootstrap/dist/js/bootstrap.min.js\"></script><meta charset=\"utf-8\"></head><body>");

  component_globals_tag({}, out);

  out.w("<h1>Fitas</h1><br><table class=\"table\"><thead class=\"thead-dark\"><tr><th scope=\"col\">Serial</th><th scope=\"col\">Nome da Media</th><th scope=\"col\">Pool da Media</th><th scope=\"col\">ServerName Media</th><th scope=\"col\">Ultima escrita</th><th scope=\"col\">Tempo para Expira</th><th scope=\"col\">Projeto</th></tr></thead><tbody>");

  var for__19 = 0;

  marko_forEach(data, function(fita) {
    var keyscope__20 = "[" + ((for__19++) + "]");

    out.w("<tr><th scope=\"row\">" +
      marko_escapeXml(fita.MediaSerial) +
      "</th><td>" +
      marko_escapeXml(fita.MediaName) +
      "</td><td>" +
      marko_escapeXml(fita.Pool) +
      "</td><td>" +
      marko_escapeXml(fita.ServerName) +
      "</td><td>" +
      marko_escapeXml(fita.LastWritten) +
      "</td><td>" +
      marko_escapeXml(fita.ExpirationDate) +
      "</td><td>" +
      marko_escapeXml(fita.Project) +
      "</td></tr>");
  });

  out.w("</tbody></table>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "29");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/system-tape-manage$1.0.0/views/tapes/showAllTapes.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
