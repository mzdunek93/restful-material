import React from "react";
import { RadioButtonGroup, RadioButton } from "material-ui";

module.exports = React.createClass({
  getValue(){
    return this.refs['group'].getSelectedValue();
  },

  getSelectedValue(){
    return this.getValue();
  },

  onChange(e, selected) {
    this.props.model.set(this.props.attribute, selected);
  },

  render() {
    var selected = this.props.model.get(this.props.attribute);

    return (
      <div className="radioButtonGroup">
        <RadioButtonGroup name={this.props.attribute}
                          ref="group"
                          onChange={this.onChange}
                          defaultSelected={selected} >
          {this.props.items.map((item, i)=>{
            return (
              <RadioButton value={item.payload} key={i} label={item.text} />
            )
           })}
        </RadioButtonGroup>
      </div>
    )
  },
});
