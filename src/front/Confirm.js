import React from "react";
import { Dialog } from "material-ui";

var Component = React.createClass({
  getInitialState() {
    return {
      message: '',
      title: '',
      buttons: {
        cancel: '', confirm: ''
      },
      onConfirm: ()=> {}
    }
  },

  show(message, args) {
    this.setState({
      message: message,
      title: args.title,
      buttons: args.buttons,
      onConfirm: args.onConfirm
    }, ()=> this.refs.confirm.show());
  },

  render(){
    let actions = [{text: this.state.buttons.cancel},
                   {text: this.state.buttons.confirm, onTouchTap: ()=> {
                     this.state.onConfirm();
                     this.refs.confirm.dismiss();
                   }}]

    return (
      <Dialog ref="confirm"
              title={this.state.title}
              actions={actions} >
        {this.state.message}
      </Dialog>
    )
  }
});

var Mixin = {
  childContextTypes: {
    confirm: React.PropTypes.object
  },

  getChildContext(){
    return {
      confirm: this.state.confirm
    }
  },

  getInitialState() {
    return {
      confirm: null
    }
  },

  componentDidMount() {
    this.setState({confirm: this.refs.confirm})
  },

  confirmComponent() {
    return <Component ref="confirm" />
  }
}

module.exports = {
  Mixin: Mixin,
  Component: Component
}
