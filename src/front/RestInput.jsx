import React from "react";
import _ from "underscore";
import RestField from "./RestField";
import RestDatePicker from "./RestDatePicker";
import RestDropDownMenu from "./RestDropDownMenu";
import RestRadioButtonGroup from "./RestRadioButtonGroup";
import CountriesDropDownMenu from "./CountriesDropDownMenu";

var RestInput = React.createClass({
  propTypes: {
    resource: React.PropTypes.object.isRequired,
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
      string: this.labeledField,
      dropDown: this.labeledDropDownMenu,
      radio: this.radioButtonGroup,
      country: this.country,
      date: this.date
    }
  },

  labeledField() {
    return (
      <RestField label={this.props.label}
                    model={this.props.resource}
                    ref={this.props.attribute}
                    attribute={this.props.attribute} />
    );
  },

  labeledDropDownMenu() {
    return (
      <span>
        <label>{this.props.label}</label>
        <RestDropDownMenu attribute={this.props.attribute}
                             ref={this.props.attribute}
                             model={this.props.resource}
                             items={this.props.items} />
      </span>
    )
  },

  radioButtonGroup() {
    return (
      <RestRadioButtonGroup ref={this.props.attribute} {...this.props} />
    )
  },

  country() {
    return (
      <CountriesDropDownMenu model={this.props.resource}
                             ref={this.props.attribute}
                             attribute={this.props.attribute} />
    );
  },

  date() {
    return (
      <RestDatePicker ref={this.props.attribute}
                         model={this.props.resource}
                         {...this.props} />
    );
  },

  render(){
    return this.inputs()[this.props.type]();
  }
});

module.exports = RestInput;
