import React from "react";
import mui from "material-ui";

module.exports = React.createClass({
  propTypes: {
    attribute: React.PropTypes.string,
    model: React.PropTypes.object,
    id: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      id: "id-" + Math.random(),
      type: 'text'
    }
  },

  getInitialState() {
    return {value: this.props.model.get(this.props.attribute)};
  },

  getValue() {
    return this.refs.field.getValue();
  },

  valueLink() {
    return {
      value: this.state.value,
      requestChange: (value)=> {
        this.props.model.set(this.props.attribute, value);
        this.setState({value: value})
      }
    }
  },

  render(){
    var props = {id: this.props.id,
                 multiLine: this.props.multiLine,
                 ref: 'field',
                 valueLink: this.valueLink(),
                 type: this.props.type,
                 floatingLabelText: this.props.label},
        model = this.props.model,
        attribute = this.props.attribute;
    if(model && attribute)
      props.errorText    = model.errors[attribute];

    return React.createElement(mui.TextField, props);
  }
})
