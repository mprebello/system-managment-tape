// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/reports/showReportIndex.marko",
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

  out.w("<html lang=\"en\"><head><meta charset=\"utf-8\"><link href=\"/css/bootstrap.min.css\" rel=\"stylesheet\"><script src=\"/js/bootstrap.min.js\"></script></head><body>");

  component_globals_tag({}, out);

  out.w("<h1>TOTAL FITAS</h1><table class=\"table table-striped table-bordered\"><thead><tr><th>Projeto</th><th>Total Fitas Gravadas</th><th>REPOSITORIO EXTERNO</th><th>REPOSITORIO LOCAL</th><th>TOTAL FITAS SCRATCH</th><th>TOTAL FITAS</th></tr></thead><tbody>");

  var for__17 = 0;

  marko_forEach(data, function(info) {
    var keyscope__18 = "[" + ((for__17++) + "]");

    out.w("<tr><th scope=\"row\">" +
      marko_escapeXml(info.group) +
      "</th><td>" +
      marko_escapeXml(info.total_remote + info.total_local) +
      "</td><td>" +
      marko_escapeXml(info.total_remote) +
      "</td><td>" +
      marko_escapeXml(info.total_local) +
      "</td><td>" +
      marko_escapeXml(info.total_scratch) +
      "</td><td>" +
      marko_escapeXml(info.total) +
      "</td></tr>");
  });

  out.w("</tbody></table>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "26");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/system-tape-manage$1.0.0/views/reports/showReportIndex.marko",
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
