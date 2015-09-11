import React from "react";
import _ from "underscore";
import { IntlMixin } from "react-intl";
import { FormattedMessage, FormattedHTMLMessage, FormattedNumber } from "react-intl";

var MessageComponent = React.createClass({
  mixins: [IntlMixin],

  getProps() {
    return _.extend(_.omit(this.props, 'messages', 'path', 'component'),
                    {message: this.getIntlMessage(this.props.path)});
  },

  render() {
    return React.createElement(this.props.component, this.getProps());
  }
});

class Intl {
  constructor(messages) {
    this.messages = messages;
  }

  msg(path, props = {}) {
    return <MessageComponent messages={this.messages}
                             path={path}
                             component={FormattedMessage}
                             {...props} />
  }

  htmlMsg(path, props = {}) {
    return <MessageComponent messages={this.messages}
                             path={path}
                             component={FormattedHTMLMessage}
                             {...props} />
  }

  number(value, props = {}) {
    return <FormattedNumber {...props} value={value} />
  }

  currency(value, props = {}) {
    return this.number(value, _.extend(props, {style: 'currency'}));
  }
}

module.exports = Intl;
