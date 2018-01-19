import React from "react";
import { Dialog, FlatButton } from "material-ui";
import createReactClass from "create-react-class";

var Component = createReactClass({
  getInitialState() {
    return {
      messages: [''],
      title: '',
      buttons: {
        cancel: '', confirm: ''
      },
      open: false,
      onConfirm: ()=> {}
    }
  },

  show(messages, args) {
    if(!Array.isArray(messages)) messages = [messages];

    this.setState({
      messages: messages,
      title: args.title,
      buttons: args.buttons,
      onConfirm: args.onConfirm,
      open: true
    });
  },

  render(){
    let actions = [
      <FlatButton label={this.state.buttons.confirm}
                  primary={true}
                  onTouchTap={() => {
                    this.state.onConfirm();
                    this.setState({open: false})}} />,

      <FlatButton label={this.state.buttons.cancel}
                  secondary={true}
                  onTouchTap={() => this.setState({open: false})} />
    ];

    return (
      <Dialog open={this.state.open}
              title={this.state.title}
              actions={actions} >
        {this.state.messages.map((m, i) => <div key={i}>{m}</div>)}
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
