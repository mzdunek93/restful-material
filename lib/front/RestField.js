"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _materialUi = require("material-ui");

var _materialUi2 = _interopRequireDefault(_materialUi);

module.exports = _react2["default"].createClass({
  displayName: "exports",

  propTypes: {
    attribute: _react2["default"].PropTypes.string,
    model: _react2["default"].PropTypes.object,
    id: _react2["default"].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      id: "id-" + Math.random(),
      type: "text"
    };
  },

  getInitialState: function getInitialState() {
    return { value: this.props.model.get(this.props.attribute) };
  },

  getValue: function getValue() {
    return this.refs.field.getValue();
  },

  valueLink: function valueLink() {
    var _this = this;

    return {
      value: this.state.value,
      requestChange: function requestChange(value) {
        _this.props.model.set(_this.props.attribute, value);
        _this.setState({ value: value });
      }
    };
  },

  render: function render() {
    var props = { id: this.props.id,
      multiLine: this.props.multiLine,
      ref: "field",
      valueLink: this.valueLink(),
      type: this.props.type,
      floatingLabelText: this.props.label },
        model = this.props.model,
        attribute = this.props.attribute;
    if (model && attribute) props.errorText = model.errors[attribute];

    return _react2["default"].createElement(_materialUi2["default"].TextField, props);
  }
});