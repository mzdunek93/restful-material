"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Config = require("./Config");

var _Config2 = _interopRequireDefault(_Config);

var _Ajax = require("./Ajax");

var _Ajax2 = _interopRequireDefault(_Ajax);

var Store = function Store() {
  _classCallCheck(this, Store);
};

var mixer = function mixer(base, mixins) {
  mixins.forEach(function (mixin) {
    for (var name in mixin) {
      if (base[name]) throw new Error("A mixin overwrites a property called \"" + name + "\"");

      base[name] = mixin[name];
    }
  });
};

module.exports = function () {
  var definition = arguments[0] === undefined ? {} : arguments[0];

  if (definition.ajax) throw new Error("Cannot define a function called ajax.");

  var store = new Store();

  if (definition.mixins) {
    mixer(definition, definition.mixins, store);
    delete definition.mixins;
  }

  for (var fun in definition) {
    var def = definition[fun];
    store[fun] = typeof def === "function" ? def.bind(store) : def;
  }

  var ajaxOpts = _Config2["default"].get("ajax");
  if (!ajaxOpts) throw new Error("The App should be configured with the ajax options");
  store.ajax = new _Ajax2["default"](ajaxOpts);

  return store;
};