import React from "react";
import { TextField } from "material-ui";

module.exports = React.createClass({
  propTypes: {
    attribute: React.PropTypes.string,
    model: React.PropTypes.object,
    id: React.PropTypes.string,
    transformer: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      id: "id-" + Math.random(),
      type: 'text',
      transformer: v => v
    }
  },

  getInitialState() {
    return {
      value: this.props.transformer(this.props.model.get(this.props.attribute))
    };
  },

  getValue() {
    return this.refs.field.getValue();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.model.get(nextProps.attribute)})
  },

  valueLink() {
    return {
      value: this.state.value,
      requestChange: (value)=> {
        value = this.props.transformer(value);
        let input = this.refs.field._getInputNode();//it looks like a private method...
        let start = input.selectionStart;
        let end   = input.selectionEnd;

        this.props.model.set(this.props.attribute, value);
        this.props.model.check(this.props.attribute);
        this.setState({value: value}, () => {
          input.selectionStart = start;
          input.selectionEnd   = end;
        });
        if(this.props.onChange)
          this.props.onChange(value)
      }
    }
  },

  render(){
    return <TextField {...this.props}
                      ref='field'
                      errorText={this.props.model.errors[this.props.attribute]}
                      valueLink={this.valueLink()}
                      floatingLabelText={this.props.label} />
  }
})
