import React from "react";
import { DatePicker } from "material-ui";

module.exports = React.createClass({
  dateFormat(date) {
    if(!(date instanceof Date))
      date = new Date(date);

    return date.toLocaleDateString('fr-FR');
  },

  getValue() {
    return this.refs.picker.getDate();
  },

  getSelectedValue() {
    return this.getValue;
  },

  getDate() {
    return this.getValue;
  },

  onChange(_, date) {
    this.props.model.set(this.props.attribute, date);
  },

  render() {
    var m = this.props.model;

    return (
      <DatePicker ref="picker"
                  hintText={this.props.label}
                  showYearSelector={this.props.showYearSelector}
                  onChange={this.onChange}
                  errorText={m.errors[this.props.attribute]}
                  formatDate={this.dateFormat}
                  defaultDate={m.get(this.props.attribute)} />
    );
  }
});
