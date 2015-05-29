"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

module.exports = _react2["default"].createClass({
  displayName: "exports",

  render: function render() {
    return _react2["default"].createElement(
      "div",
      { className: "spinner-body" },
      _react2["default"].createElement(
        "svg",
        { className: "spinner",
          width: "65px",
          height: "65px",
          viewBox: "0 0 66 66",
          xmlns: "http://www.w3.org/2000/svg" },
        _react2["default"].createElement("circle", { className: "path",
          fill: "none",
          strokeWidth: "6",
          strokeLinecap: "round",
          cx: "33", cy: "33", r: "30" })
      )
    );
  }
});