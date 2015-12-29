import React from "react";
import { SelectField } from "material-ui";

module.exports = React.createClass({
  propTypes: {
    attribute: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    model: React.PropTypes.object.isRequired,
    sort: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      onChange: v => v
    }
  },

  getInitialState() {
    if(this.props.model.isBlank(this.props.attribute))
      throw new Error(`The attribute "${this.props.attribute}" of ${this.props.model} is not set`);

    return {
      value: this.props.model.get(this.props.attribute)
    }
  },

  getSelectedValue() {
    return this.props.model.get(this.props.attribute);
  },

  getValue() {
    return this.getSelectedValue();
  },

  items() {
    if(this.props.sort)
      return this.props.items.sort(this.props.sort);
    else
      return this.props.items;
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.model && nextProps.attribute)
      this.setState({value: nextProps.model.get(nextProps.attribute)});
  },

  _onChange(_, __, item) {
    this.setState({value: item.payload}, () =>
      this.props.model.set(this.props.attribute, item.payload)
    );
  },

  render() {
    return (
      <span>
        <SelectField {...this.props}
                     floatingLabelText={this.props.label}
                     errorText={this.props.model.errors[this.props.attribute]}
                     value={this.state.value}
                     onChange={this._onChange}
                     menuItems={this.items()}
                     className={this.props.className} />
      </span>
    )
  }
});
