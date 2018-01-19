import React from "react";
import { DatePicker, TextField } from "material-ui";
import createReactClass from "create-react-class";

module.exports = createReactClass({
  contextTypes: {
    readOnly: React.PropTypes.bool
  },

  dateFormat(date) {
    if(!date)
      return date;
    if(!(date instanceof Date))
      date = new Date(date);

    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return date.toLocaleDateString(Config.get('locale') || 'fr-FR');
  },

  getValue() {
    return this.refs.picker.getDate();
  },

  getSelectedValue() {
    return this.getValue();
  },

  getDate() {
    return this.getValue();
  },

  onChange(_, date) {
    this.props.model.set(this.props.attribute, date);
  },

  render() {
    var m = this.props.model;
    var props = {
      ref: 'picker',
      hintText: this.props.label,
      floatingLabelText: this.props.label,
      showYearSelector: this.props.showYearSelector,
      onChange: this.onChange,
      errorText: m.errors[this.props.attribute],
      formatDate: this.dateFormat,
    }
    var value = m.get(this.props.attribute);
    if(value)
      props.defaultDate = value;

    if(this.context.readOnly)
      return <TextField value={this.dateFormat(props.defaultDate)}
                        floatingLabelText={this.props.label}
                        readOnly={true} />
    else
      return <DatePicker {...props} />
  }
});
