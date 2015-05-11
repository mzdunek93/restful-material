import React from "react";
import { DatePicker } from "material-ui";

module.exports = React.createClass({
  dateFormat(date) {
    if(!(date instanceof Date))
      throw new Error(`Expected ${date} to be a Date object`);

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

  render() {
    var m = this.props.model;

    return (
      <DatePicker ref="picker"
                  errorText={m.errors[this.props.attribute]}
                  formatDate={this.dateFormat}
                  defaultDate={m.get(this.props.attribute)} />
    );
  },
});
