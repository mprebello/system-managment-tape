// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/reports/showReportIndex.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    header_template = marko_loadTemplate(require.resolve("../templates/header.marko")),
    menu_template = marko_loadTemplate(require.resolve("../templates/menu.marko")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
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

  include_tag({
      _target: menu_template,
      _arg: {
          user: data.user_info.login
        }
    }, out, __component, "4");

  out.w("<h2>Relatorio Fitas</h2><table class=\"table table-striped table-bordered\"><thead><tr><th>Projeto</th><th>Total Fitas Gravadas</th><th>Repositorio Externo</th><th>Repositorio Local</th><th>Total Fitas Reciclagem</th><th>Total Fitas</th></tr></thead><tbody>");

  var for__16 = 0;

  marko_forEach(data.reportmedias, function(info) {
    var keyscope__17 = "[" + ((for__16++) + "]");

    out.w("<tr><th scope=\"row\"><a href=\"/tapes?project=" +
      marko_escapeXmlAttr(info.group) +
      "\">" +
      marko_escapeXml(info.group) +
      "</a></th><td>" +
      marko_escapeXml(info.total_remote + info.total_local) +
      "</td><td><a href=\"/tapes?project=" +
      marko_escapeXmlAttr(info.group) +
      "&amp;repo=externo\">" +
      marko_escapeXml(info.total_remote) +
      "</a></td><td><a href=\"/tapes?project=" +
      marko_escapeXmlAttr(info.group) +
      "&amp;repo=local\">" +
      marko_escapeXml(info.total_local) +
      "</a></td><td><a href=\"/tapes?project=" +
      marko_escapeXmlAttr(info.group) +
      "&amp;repo=reciclagem\">" +
      marko_escapeXml(info.total_scratch) +
      "</a></td><td><a href=\"/tapes?project=" +
      marko_escapeXmlAttr(info.group) +
      "\">" +
      marko_escapeXml(info.total) +
      "</a></td></tr>");
  });

  out.w("</tbody></table>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "30");

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
      "../templates/header.marko",
      "../templates/menu.marko",
      "marko/src/taglibs/core/include-tag",
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
