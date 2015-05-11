import React from "react";
import { RadioButtonGroup, RadioButton } from "material-ui";

module.exports = React.createClass({
  getValue(){
    return this.refs['group'].getSelectedValue();
  },

  getSelectedValue(){
    return this.getValue();
  },

  render() {
    var selected = this.props.resource.get(this.props.attribute);

    return (
      <div className="radioButtonGroup">
        <RadioButtonGroup name={this.props.attribute}
                          ref="group"
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
