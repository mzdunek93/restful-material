"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

module.exports = _react2["default"].createClass({
  displayName: "exports",

  getValue: function getValue() {
    return this.refs["group"].getSelectedValue();
  },

  getSelectedValue: function getSelectedValue() {
    return this.getValue();
  },

  onChange: function onChange(e, selected) {
    this.props.model.set(this.props.attribute, selected);
  },

  render: function render() {
    var selected = this.props.model.get(this.props.attribute);

    return _react2["default"].createElement(
      "div",
      { className: "radioButtonGroup" },
      _react2["default"].createElement(
        _materialUi.RadioButtonGroup,
        { name: this.props.attribute,
          ref: "group",
          onChange: this.onChange,
          defaultSelected: selected },
        this.props.items.map(function (item, i) {
          return _react2["default"].createElement(_materialUi.RadioButton, { value: item.payload, key: i, label: item.text });
        })
      )
    );
  } });