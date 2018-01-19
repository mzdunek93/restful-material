import React from "react";
import { RadioButtonGroup, RadioButton } from "material-ui";
import createReactClass from "create-react-class";

module.exports = createReactClass({
  getInitialState() {
    return {
      selected: this.props.model.get(this.props.attribute)
    }
  },

  getValue(){
    return this.refs['group'].getSelectedValue();
  },

  getSelectedValue(){
    return this.getValue();
  },

  onChange(e, selected) {
    this.props.model.set(this.props.attribute, selected);
    this.setState({selected: selected});
  },

  componentWillReceiveProps(nextProps) {
    this.setState({selected: nextProps.model.get(nextProps.attribute)});
  },

  render() {
    return (
      <div className="radioButtonGroup">
        <RadioButtonGroup name={this.props.attribute}
                          ref="group"
                          onChange={this.onChange}
                          valueSelected={this.state.selected} >
          {this.props.items.map((item, i)=>{
            return (
              <RadioButton value={item.payload} key={i} label={item.text} />
            )
           })}
        </RadioButtonGroup>
      </div>
    )
  }
});
