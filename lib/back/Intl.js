"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _reactIntl = require("react-intl");

var MessageComponent = _react2["default"].createClass({
  displayName: "MessageComponent",

  mixins: [_reactIntl.IntlMixin],

  getProps: function getProps() {
    return _underscore2["default"].extend(_underscore2["default"].omit(this.props, "messages", "path", "component"), { message: this.getIntlMessage(this.props.path) });
  },

  render: function render() {
    return _react2["default"].createElement(this.props.component, this.getProps());
  }
});

var Intl = (function () {
  function Intl(messages) {
    _classCallCheck(this, Intl);

    this.messages = messages;
  }

  _createClass(Intl, [{
    key: "msg",
    value: function msg(path) {
      var props = arguments[1] === undefined ? {} : arguments[1];

      return _react2["default"].createElement(MessageComponent, _extends({ messages: this.messages,
        path: path,
        component: _reactIntl.FormattedMessage
      }, props));
    }
  }, {
    key: "htmlMsg",
    value: function htmlMsg(path) {
      var props = arguments[1] === undefined ? {} : arguments[1];

      return _react2["default"].createElement(MessageComponent, _extends({ messages: this.messages,
        path: path,
        component: _reactIntl.FormattedHTMLMessage
      }, props));
    }
  }]);

  return Intl;
})();

module.exports = Intl;