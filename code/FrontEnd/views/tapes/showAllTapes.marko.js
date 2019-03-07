// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/tapes/showAllTapes.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    header_template = marko_loadTemplate(require.resolve("../templates/header.marko")),
    menu_template = marko_loadTemplate(require.resolve("../templates/menu.marko")),
    searchScript_template = marko_loadTemplate(require.resolve("../templates/searchScript.marko")),
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    include_tag = marko_loadTag(require("marko/src/taglibs/core/include-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<html><head>");

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

  out.w("<h2>Fitas</h2><br><table id=\"myTable\" class=\"table table-hover\" width=\"100%\"><thead class=\"thead-dark\"><tr><td><input type=\"text\" value=\"" +
    marko_escapeXmlAttr(data.value_serial) +
    "\" id=\"myInputSerial\" onkeyup=\"searchAllField()\" placeholder=\"Procure pelo Serial\"></td><td><input type=\"text\" value=\"" +
    marko_escapeXmlAttr(data.value_media) +
    "\" id=\"myInputMediaName\" onkeyup=\"searchAllField()\" placeholder=\"Procure pela Media\"></td><td><select id=\"myInputProject\" placeholder=\"Escolha um Projeto\" value=\"" +
    marko_escapeXmlAttr(data.value_project) +
    "\" onchange=\"searchAllField()\"><option value=\"\"></option>");

  var for__17 = 0;

  marko_forEach(data.projects, function(project) {
    var keyscope__18 = "[" + ((for__17++) + "]");

    out.w("<ul>");

    if (data.value_project == project) {
      out.w("<li><option selected=\"" +
        marko_escapeXmlAttr(project) +
        "\" value=\"" +
        marko_escapeXmlAttr(project) +
        "\">" +
        marko_escapeXml(project) +
        "</option></li>");
    } else {
      out.w("<li><option value=\"" +
        marko_escapeXmlAttr(project) +
        "\">" +
        marko_escapeXml(project) +
        "</option></li>");
    }

    out.w("</ul>");
  });

  out.w("</select></td><td><select id=\"myInputRepo\" placeholder=\"Escolha um Repositorio\" value=\"" +
    marko_escapeXmlAttr(data.value_repository) +
    "\" onchange=\"searchAllField()\"><option></option>");

  var for__27 = 0;

  marko_forEach(data.repository, function(repo) {
    var keyscope__28 = "[" + ((for__27++) + "]");

    out.w("<ul>");

    if (data.value_repository == repo) {
      out.w("<li><option selected=\"" +
        marko_escapeXmlAttr(repo) +
        "\" value=\"" +
        marko_escapeXmlAttr(repo) +
        "\">" +
        marko_escapeXml(repo) +
        "</option></li>");
    } else {
      out.w("<li><option value=\"" +
        marko_escapeXmlAttr(repo) +
        "\">" +
        marko_escapeXml(repo) +
        "</option></li>");
    }

    out.w("</ul>");
  });

  out.w("</select></td><td><select id=\"myInputPool\" value=\"" +
    marko_escapeXmlAttr(data.value_pool) +
    "\" placeholder=\"Escolha um Pool\" onchange=\"searchAllField()\"><option></option>");

  var for__37 = 0;

  marko_forEach(data.pools, function(pool) {
    var keyscope__38 = "[" + ((for__37++) + "]");

    out.w("<ul>");

    if (data.value_pool == pool) {
      out.w("<li><option selected=\"" +
        marko_escapeXmlAttr(pool) +
        "\" value=\"" +
        marko_escapeXmlAttr(pool) +
        "\">" +
        marko_escapeXml(pool) +
        "</option></li>");
    } else {
      out.w("<li><option value=\"" +
        marko_escapeXmlAttr(pool) +
        "\">" +
        marko_escapeXml(pool) +
        "</option></li>");
    }

    out.w("</ul>");
  });

  out.w("</select></td><td><select id=\"myInputServer\" value=\"" +
    marko_escapeXmlAttr(data.value_server) +
    "\" placeholder=\"Escolha um Servidor\" onchange=\"searchAllField()\"><option value=\"\"></option>");

  var for__47 = 0;

  marko_forEach(data.servers, function(server) {
    var keyscope__48 = "[" + ((for__47++) + "]");

    out.w("<ul>");

    if (data.value_server == server) {
      out.w("<li><option selected=\"" +
        marko_escapeXmlAttr(server) +
        "\" value=\"" +
        marko_escapeXmlAttr(server) +
        "\">" +
        marko_escapeXml(server) +
        "</option></li>");
    } else {
      out.w("<li><option value=\"" +
        marko_escapeXmlAttr(server) +
        "\">" +
        marko_escapeXml(server) +
        "</option></li>");
    }

    out.w("</ul>");
  });

  out.w("</select></td><td></td><td></td></tr><tr><th scope=\"col\">Serial</th><th scope=\"col\">Nome</th><th scope=\"col\">Projeto</th><th scope=\"col\">Repositorio</th><th scope=\"col\">Pool</th><th scope=\"col\">Server</th><th scope=\"col\">Ultima escrita</th><th scope=\"col\">Data a Expirar</th></tr></thead><tbody id=\"myData\">");

  var for__66 = 0;

  marko_forEach(data.medias, function(fita) {
    var keyscope__67 = "[" + ((for__66++) + "]");

    out.w("<tr><th id=\"row_data\" scope=\"row\">" +
      marko_escapeXml(fita.MediaSerial) +
      "</th><td>" +
      marko_escapeXml(fita.MediaName) +
      "</td><td>" +
      marko_escapeXml(fita.Project) +
      "</td><td>" +
      marko_escapeXml(fita.Repo) +
      "</td><td>" +
      marko_escapeXml(fita.Pool) +
      "</td><td>" +
      marko_escapeXml(fita.ServerName) +
      "</td><td>" +
      marko_escapeXml(fita.LastWritten) +
      "</td><td>" +
      marko_escapeXml(fita.ExpirationDate) +
      "</td></tr>");
  });

  out.w("</tbody></table>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "77");

  out.w("</body><script src=\"jspub/searchInTable.js\"></script>");

  include_tag({
      _target: searchScript_template
    }, out, __component, "79");

  out.w("</html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/system-tape-manage$1.0.0/views/tapes/showAllTapes.marko",
    tags: [
      "../templates/header.marko",
      "../templates/menu.marko",
      "../templates/searchScript.marko",
      "marko/src/taglibs/core/include-tag",
      "marko/src/components/taglib/component-globals-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
