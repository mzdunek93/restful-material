"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _materialUi = require("material-ui");

// Sadly the DropDownMenu from material-ui does not have getValue() method.
// This fixes this.
// Also the "selected" value for the drop down has to be the first element
// in the array passed to DropDownMenu's menuItems prop.
// This does the work of ordering the array correctly.
module.exports = _react2["default"].createClass({
  displayName: "exports",

  propTypes: {
    attribute: _react2["default"].PropTypes.string.isRequired,
    items: _react2["default"].PropTypes.array.isRequired,
    model: _react2["default"].PropTypes.object.isRequired,
    id: _react2["default"].PropTypes.string
  },

  getInitialState: function getInitialState() {
    if (this.props.model.isBlank(this.props.attribute)) throw new Error("The attribute \"" + this.props.attribute + "\" of " + this.props.model + " is not set");

    var payload = this.props.model.get(this.props.attribute);

    return {
      items: this.items(payload),
      payload: payload
    };
  },

  _onChange: function _onChange(_, __, item) {
    this.setState({ payload: item.payload });
    this.props.model.set(this.props.attribute, item.payload);
  },

  getSelectedValue: function getSelectedValue() {
    return this.state.payload;
  },

  getValue: function getValue() {
    return this.getSelectedValue();
  },

  items: function items(payload) {
    var predicate = function predicate(itemSpec) {
      return itemSpec.payload == payload;
    };
    var selected = _underscore2["default"].find(this.props.items, predicate);
    if (selected) return [selected].concat(_underscore2["default"].reject(this.props.items, predicate));else return this.props.items;
  },

  render: function render() {
    return _react2["default"].createElement(
      "span",
      null,
      _react2["default"].createElement(
        "label",
        null,
        this.props.label
      ),
      _react2["default"].createElement(_materialUi.DropDownMenu, { id: this.props.id || this.props.attribute,
        errorText: this.props.model.errors[this.props.attribute],
        onChange: this._onChange,
        menuItems: this.state.items,
        className: this.props.className })
    );
  }
});