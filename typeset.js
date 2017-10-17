'use strict';

let mj = require("mathjax-node/lib/main.js");
mj.config({
  MathJax: {
    TeX: {
      extensions: ["color.js"]
    }
  }
});


let typesetConfig = function(tex) {
  return {
    math: cleanTex(tex),
    format: "inline-TeX",
    svg: true,
    mml: true,
    speakText: false,
    ex: 6,
    width: 100,
    linebreaks: true
  }
};

let cleanTex = function(tex) {
  return tex.replace(/\\slash/, '/')
};

let mjCallback = function(cb) {
  return function(data) {
    if (!data.errors) {
      cb(null, {svg: data.svg, mml: data.mml});
    } else {
      cb(data.errors);
    }
  }
};

// Public
let typeset = function(tex, cb) {
  mj.typeset(typesetConfig(tex), mjCallback(cb));
};

module.exports = typeset;
