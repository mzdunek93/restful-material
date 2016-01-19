import React from "react";
import { SelectField, TextField, MenuItem } from "material-ui";

module.exports = React.createClass({
  propTypes: {
    attribute: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    model: React.PropTypes.object.isRequired,
    sort: React.PropTypes.func
  },

  contextTypes: {
    readOnly: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      onChange: v => v
    }
  },

  getInitialState() {
    let value = this.props.model.get(this.props.attribute);
    if(value === undefined || value === null || value === '')
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

  _onChange(_, __, value) {
    this.setState({value: value}, () =>
      this.props.model.set(this.props.attribute, value)
    );
  },

  render() {
    let items = this.items();

    if(this.context.readOnly)
      return <TextField value={(items.find(i => i.payload == this.state.value) || {}).text}
                        floatingLabelText={this.props.label}
                        readOnly={true} />
    else
      return (
        <span>
          <SelectField {...this.props}
                       floatingLabelText={this.props.label}
                       errorText={this.props.model.errors[this.props.attribute]}
                       value={this.state.value}
                       onChange={this._onChange}
                       className={this.props.className} >
            {items.map((item, i) =>
               <MenuItem key={i}
                         primaryText={item.text}
                         value={item.payload} />
             )}
          </SelectField>
        </span>
    )
  }
});
