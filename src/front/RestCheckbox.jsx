import React from "react";
import { Checkbox } from "material-ui";
import createReactClass from "create-react-class";

module.exports = createReactClass({
  getInitialState() {
    return {
      checked: !!this.props.model.get(this.props.attribute)
    }
  },

  onCheck(e, checked) {
    this.props.model.set(this.props.attribute, checked);
  },

  set() {
    this.refs.cb.setChecked(this.state.checked);
  },

  componentDidMount() {
    this.set();
  },

  componentWillReceiveProps(nextProps) {
    this.setState({checked: !!nextProps.model.get(nextProps.attribute)});
    this.set();
  },

  isChecked() {
    return this.state.checked
  },

  render() {
    return (
      <Checkbox name={this.props.attribute}
                label={this.props.label || this.props.attribute}
                ref="cb"
                onCheck={this.onCheck}
                {...this.props} />
    )
  }
});
