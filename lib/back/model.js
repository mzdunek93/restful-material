'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var Model = (function () {
  function Model() {
    var map = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Model);

    this.map = map;
    this.errors = {};
  }

  _createClass(Model, [{
    key: 'get',
    value: function get(key) {
      return this.map[key];
    }
  }, {
    key: 'set',
    value: function set(key, value) {
      return this.map[key] = value;
    }
  }, {
    key: 'update',
    value: function update(map) {
      this.map = _underscore2['default'].extend(this.map, map);
      return this;
    }
  }, {
    key: 'merge',
    value: function merge(other) {
      return this.update(other.map);
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return this.map;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.get('id');
    }
  }, {
    key: 'errorMessages',
    value: function errorMessages() {
      var messages = [];
      _underscore2['default'].each(this.errors, function (msg, attribute) {
        if (msg instanceof Array) msg = msg.join('. ');
        messages.push('' + attribute.replace('_', ' ') + ': ' + msg);
      });
      return messages;
    }
  }, {
    key: 'isBlank',
    value: function isBlank(attribute) {
      var value = this.get(attribute);
      return _underscore2['default'].isNull(value) || _underscore2['default'].isUndefined(value) || value === '';
    }
  }, {
    key: 'setDefault',
    value: function setDefault(attribute, value) {
      if (this.isBlank(attribute)) this.set(attribute, value);
    }
  }]);

  return Model;
})();

module.exports = Model;