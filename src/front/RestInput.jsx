import React from "react";
import RestField from "./RestField";
import RestDatePicker from "./RestDatePicker";
import RestSelectField from "./RestSelectField";
import RestRadioButtonGroup from "./RestRadioButtonGroup";
import RestCheckbox from "./RestCheckbox";
import CountriesSelectField from "./CountriesSelectField";

var RestInput = React.createClass({
  propTypes: {
    model: React.PropTypes.object.isRequired,
    label: React.PropTypes.any,
    kind: React.PropTypes.string.isRequired,
    attribute: React.PropTypes.string.isRequired
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
