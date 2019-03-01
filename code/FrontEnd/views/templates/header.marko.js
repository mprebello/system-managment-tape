// Compiled using marko@4.13.4-1 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_componentType = "/system-tape-manage$1.0.0/views/templates/header.marko",
    components_helpers = require("marko/src/components/helpers"),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<link rel=\"stylesheet\" href=\"/css/bootstrap.min.css\"><script src=\"/js/jquery.min.js\"></script><script src=\"/js/bootstrap.min.js\"></script><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" type=\"text/css\" href=\"csspub/head.css\"><link rel=\"stylesheet\" type=\"text/css\" href=\"csspub/login.css\">");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    id: "/system-tape-manage$1.0.0/views/templates/header.marko"
  };
