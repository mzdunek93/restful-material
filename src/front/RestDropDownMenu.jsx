import React from "react";
import _ from "underscore";
import { DropDownMenu } from "material-ui";

// Sadly the DropDownMenu from material-ui does not have getValue() method.
// This fixes this.
// Also the "selected" value for the drop down has to be the first element
// in the array passed to DropDownMenu's menuItems prop.
// This does the work of ordering the array correctly.
module.exports = React.createClass({
  propTypes: {
    attribute: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    model: React.PropTypes.object.isRequired,
    id: React.PropTypes.string
  },

  getInitialState() {
    if(this.props.model.isBlank(this.props.attribute))
      throw new Error(`The attribute "${this.props.attribute}" of ${this.props.model} is not set`);

    var payload = this.props.model.get(this.props.attribute);

    return {
      items: this.items(payload),
      payload: payload
    }
  },

  _onChange(_, __, item) {
    this.setState({payload: item.payload});
    this.props.model.set(this.props.attribute, item.payload);
  },

  getSelectedValue() {
    return this.state.payload;
  },

  getValue() {
    return this.getSelectedValue();
  },

  items(payload) {
    var predicate = (itemSpec) => itemSpec.payload == payload;
    var selected = _.find(this.props.items, predicate);
    if(selected)
      return [selected].concat(_.reject(this.props.items, predicate));
    else
      return this.props.items;
  },

  render() {
    return (
      <span>
        <label>{this.props.label}</label>
        <DropDownMenu id={this.props.id || this.props.attribute}
                      errorText={this.props.model.errors[this.props.attribute]}
                      onChange={this._onChange}
                      menuItems={this.state.items}
                      className={this.props.className} />
      </span>
    )
  }
});
