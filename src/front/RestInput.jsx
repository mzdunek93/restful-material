import React from "react";
import RestField from "./RestField";
import RestDatePicker from "./RestDatePicker";
import RestDropDownMenu from "./RestDropDownMenu";
import RestRadioButtonGroup from "./RestRadioButtonGroup";
import RestCheckbox from "./RestCheckbox";
import CountriesDropDownMenu from "./CountriesDropDownMenu";

var RestInput = React.createClass({
  propTypes: {
    model: React.PropTypes.object.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
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
      dropDown: this.restDropDownMenu,
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

  restDropDownMenu() {
    return (
      <RestDropDownMenu {...this.props} ref={this.props.attribute} />
    )
  },

  radioButtonGroup() {
    return (
      <RestRadioButtonGroup {...this.props} ref={this.props.attribute} />
    )
  },

  country() {
    return (
      <CountriesDropDownMenu {...this.props} ref={this.props.attribute} />
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
    return this.inputs()[this.props.type]();
  }
});

module.exports = RestInput;
