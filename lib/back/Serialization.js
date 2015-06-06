"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isModel = function isModel(value) {
  return Array.isArray(value) && value[1] && typeof value[1] === "object" && value[1].map && value[1].errors;
};

var Serialization = (function () {
  function Serialization() {
    _classCallCheck(this, Serialization);
  }

  _createClass(Serialization, null, [{
    key: "write",
    value: function write(model) {
      return JSON.stringify(model.asJSON());
    }
  }, {
    key: "read",
    value: function read(string, models) {
      return this.readModel(JSON.parse(string), models);
    }
  }, {
    key: "readModel",
    value: function readModel(read, models) {
      var _this = this;

      var root = read[0];
      var rest = read[1];

      var constructor = models[root];
      var model = new constructor();
      model.errors = rest.errors;

      for (var key in rest.map) {
        var value = rest.map[key];

        if (Array.isArray(value) && isModel(value[0])) model.set(key, value.map(function (v) {
          return _this.readModel(v, models);
        }));else if (isModel(value)) model.set(key, this.readModel(value, models));else model.set(key, value);
      }

      return model;
    }
  }]);

  return Serialization;
})();

module.exports = Serialization;