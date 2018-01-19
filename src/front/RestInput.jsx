import React from "react";
import RestField from "./RestField";
import RestDatePicker from "./RestDatePicker";
import RestSelectField from "./RestSelectField";
import RestRadioButtonGroup from "./RestRadioButtonGroup";
import RestCheckbox from "./RestCheckbox";
import CountriesSelectField from "./CountriesSelectField";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

var RestInput = createReactClass({
  propTypes: {
    model: PropTypes.object.isRequired,
    label: PropTypes.any,
    kind: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired
  },

  getValue() {
    return this.refs['input'].getValue();
  },

  getSelectedValue() {
    return this.getValue();
  },

  inputs() {
    return {
      string: this.restField,
      number: this.restNumberField,
      dropDown: this.restSelectField,
      radio: this.radioButtonGroup,
      country: this.country,
      date: this.date,
      boolean: this.checkbox
    }
  },

  restField() {
    return (
      <RestField {...this.props} />
    )
  },

  restNumberField() {
    return (
      <RestField {...this.props} type="number" />
    )
  },

  restSelectField() {
    return (
      <RestSelectField {...this.props} ref={this.props.attribute} />
    )
  },

  radioButtonGroup() {
    return (
      <RestRadioButtonGroup {...this.props} ref={this.props.attribute} />
    )
  },

  country() {
    return (
      <CountriesSelectField {...this.props} ref={this.props.attribute} />
    )
  },

  date() {
    return (
      <RestDatePicker {...this.props} ref={this.props.attribute} />
    );
  },

  checkbox() {
    return (
      <RestCheckbox {...this.props} ref={this.props.attribute} />
    )
  },

  render(){
    return this.inputs()[this.props.kind]();
  }
});

module.exports = RestInput;
