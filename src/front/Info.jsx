import React from "react";
import { Snackbar } from "material-ui";

var Component = React.createClass({
  getInitialState() {
    return {message: '', action: null, open: false};
  },

  show(message, action = null, onAction = null) {
    this.setState({
      message: message,
      action: action,
      open: true,
      onActionTouchTap: onAction
    });
  },

  onActionTouchTap() {
    if(this.state.onActionTouchTap)
      this.state.onActionTouchTap();
    this.ok();
  },

  ok() {
    this.setState({message: '', open: false});
  },

  render(){
    return (
      <Snackbar message={this.state.message}
                action={this.state.action}
                onActionTouchTap={this.onActionTouchTap}
                style={{zIndex: '100'}}
                ref="snack"
                open={this.state.open} />
    )
  }
});

var Mixin = {
  childContextTypes: {
    info: React.PropTypes.object
  },

  getChildContext(){
    return {
      info: this.state.info
    }
  },

  getInitialState() {
    return {
      info: null
    }
  },

  componentDidMount() {
    this.setState({info: this.refs.info})
  },

  infoComponent() {
    return <Component ref="info" />
  }
}

module.exports = {
  Mixin: Mixin,
  Component: Component
}
