"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _RestField = require("./RestField");

var _RestField2 = _interopRequireDefault(_RestField);

var _RestDatePicker = require("./RestDatePicker");

var _RestDatePicker2 = _interopRequireDefault(_RestDatePicker);

var _RestDropDownMenu = require("./RestDropDownMenu");

var _RestDropDownMenu2 = _interopRequireDefault(_RestDropDownMenu);

var _RestRadioButtonGroup = require("./RestRadioButtonGroup");

var _RestRadioButtonGroup2 = _interopRequireDefault(_RestRadioButtonGroup);

var _CountriesDropDownMenu = require("./CountriesDropDownMenu");

var _CountriesDropDownMenu2 = _interopRequireDefault(_CountriesDropDownMenu);

var RestInput = _react2["default"].createClass({
  displayName: "RestInput",

  propTypes: {
    model: _react2["default"].PropTypes.object.isRequired,
    label: _react2["default"].PropTypes.string.isRequired,
    type: _react2["default"].PropTypes.string.isRequired,
    attribute: _react2["default"].PropTypes.string.isRequired
  },

  getValue: function getValue() {
    return this.refs["input"].getValue();
  },

  getSelectedValue: function getSelectedValue() {
    return this.getValue();
  },

  inputs: function inputs() {
    return {
      string: this.restField,
      dropDown: this.restDropDownMenu,
      radio: this.radioButtonGroup,
      country: this.country,
      date: this.date
    };
  },

  restField: function restField() {
    return _react2["default"].createElement(_RestField2["default"], { label: this.props.label,
      model: this.props.model,
      ref: this.props.attribute,
      attribute: this.props.attribute });
  },

  restDropDownMenu: function restDropDownMenu() {
    return _react2["default"].createElement(
      "span",
      null,
      _react2["default"].createElement(
        "label",
        null,
        this.props.label
      ),
      _react2["default"].createElement(_RestDropDownMenu2["default"], { attribute: this.props.attribute,
        ref: this.props.attribute,
        model: this.props.model,
        items: this.props.items })
    );
  },

  radioButtonGroup: function radioButtonGroup() {
    return _react2["default"].createElement(_RestRadioButtonGroup2["default"], _extends({ ref: this.props.attribute }, this.props));
  },

  country: function country() {
    return _react2["default"].createElement(_CountriesDropDownMenu2["default"], { model: this.props.model,
      ref: this.props.attribute,
      attribute: this.props.attribute });
  },

  date: function date() {
    return _react2["default"].createElement(_RestDatePicker2["default"], _extends({ ref: this.props.attribute,
      model: this.props.resource
    }, this.props));
  },

  render: function render() {
    return this.inputs()[this.props.type]();
  }
});

module.exports = RestInput;