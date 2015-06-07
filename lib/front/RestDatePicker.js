"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

module.exports = _react2["default"].createClass({
  displayName: "exports",

  dateFormat: function dateFormat(date) {
    if (!(date instanceof Date)) date = new Date(date);

    return date.toLocaleDateString("fr-FR");
  },

  getValue: function getValue() {
    return this.refs.picker.getDate();
  },

  getSelectedValue: function getSelectedValue() {
    return this.getValue;
  },

  getDate: function getDate() {
    return this.getValue;
  },

  render: function render() {
    var m = this.props.model;

    return _react2["default"].createElement(_materialUi.DatePicker, { ref: "picker",
      errorText: m.errors[this.props.attribute],
      formatDate: this.dateFormat,
      defaultDate: m.get(this.props.attribute) });
  } });