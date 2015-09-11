import React from "react";
import { SelectField } from "material-ui";

module.exports = React.createClass({
  propTypes: {
    attribute: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    model: React.PropTypes.object.isRequired,
    sort: React.PropTypes.func,
    id: React.PropTypes.string
  },

  getInitialState() {
    if(this.props.model.isBlank(this.props.attribute))
      throw new Error(`The attribute "${this.props.attribute}" of ${this.props.model} is not set`);

    return {
      selectedIndex: this.selectedIndex(this.props.model.get(this.props.attribute))
    }
  },

  _onChange(_, __, item) {
    this.setState({selectedIndex: this.selectedIndex(item.payload)}, ()=>
      this.props.model.set(this.props.attribute, item.payload)
    );
  },

  getSelectedValue() {
    return this.props.model.get(this.props.attribute);
  },

  getValue() {
    return this.getSelectedValue();
  },

  selectedIndex(payload) {
    var index = this.props.items.map((i)=> i.payload).indexOf(payload);
    if(index === -1)
      return 0;
    else
      return index;
  },

  items() {
    if(this.props.sort)
      return this.props.items.sort(this.props.sort);
    else
      return this.props.items;
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.model && nextProps.attribute)
      this.setState({selectedIndex: this.selectedIndex(nextProps.model.get(nextProps.attribute))});
  },

  render() {
    return (
      <span>
        <SelectField id={this.props.id || this.props.attribute}
                     {...this.props}
                     floatingLabelText={this.props.label}
                     errorText={this.props.model.errors[this.props.attribute]}
                     onChange={this._onChange}
                     value={this.props.items[this.state.selectedIndex].payload}
                     selectedIndex={this.state.selectedIndex}
                     menuItems={this.items()}
                     className={this.props.className} />
      </span>
    )
  }
});
