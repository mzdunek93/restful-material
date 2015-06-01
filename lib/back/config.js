"use strict";

var Config = {
  store: function store(opts) {
    return Config.opts = opts;
  },
  get: function get(opt) {
    return (Config.opts || {})[opt];
  }
};

module.exports = Config;