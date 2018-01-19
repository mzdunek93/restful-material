import React from "react";
import { TextField } from "material-ui";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

module.exports = createReactClass({
  propTypes: {
    attribute: PropTypes.string,
    model: PropTypes.object,
    transformer: PropTypes.func
  },

  contextTypes: {
    readOnly: PropTypes.bool
  },

  getDefaultProps() {
    return {
      type: 'text',
      transformer: v => v,
      onChange: v => v
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

  focus() {
    this.refs.field.focus();
  },

  valueLink() {
    return {
      value: this.state.value,
      requestChange: (value)=> {
        value = this.props.transformer(value);
        let start, end, input;
        if((this.props.type == 'text' || this.props.type == 'string') &&
           this.state.value && this.state.value.length >= value.length){
          input = this.refs.field._getInputNode();//it looks like a private method...
          start = input.selectionStart;
          end   = input.selectionEnd;
        }

        this.props.model.set(this.props.attribute, value);
        this.props.model.check(this.props.attribute);
        this.setState({value: value}, () => {
          if(input && start && end){
            input.selectionStart = start;
            input.selectionEnd   = end;
          }
        });
        this.props.onChange(value)
      }
    }
  },

  render(){
    return <TextField {...this.props}
                      ref='field'
                      readOnly={this.context.readOnly}
                      errorText={this.props.model.errors[this.props.attribute] || this.props.errorText}
                      valueLink={this.valueLink()}
                      floatingLabelText={this.props.label} />
  }
})
