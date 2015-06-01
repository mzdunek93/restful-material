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

module.exports = function () {
  var definition = arguments[0] === undefined ? {} : arguments[0];

  if (definition.ajax) throw new Error("Cannot define a function called ajax.");

  var store = new Store();
  for (var fun in definition) store[fun] = definition[fun];

  var ajaxOpts = _Config2["default"].get("ajax");
  if (!ajaxOpts) throw new Error("The App should be configured with the ajax options");
  store.ajax = new _Ajax2["default"](ajaxOpts);

  return store;
};