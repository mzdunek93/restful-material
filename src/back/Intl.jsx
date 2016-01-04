import React from "react";
import { IntlMixin } from "react-intl";
import { FormattedMessage, FormattedHTMLMessage, FormattedNumber } from "react-intl";
import Config from "./Config";

var MessageComponent = React.createClass({
  mixins: [IntlMixin],

  getProps() {
    let {
      messages,
      path,
      component,
      ...values
    } = this.props;

    return {id: path, values: values};
  },

  render() {
    return React.createElement(this.props.component, this.getProps());
  }
});

class RestIntl {
  constructor(messages, locale = 'en-GB') {
    this.messages = messages;
    this.setLocale(locale);
  }

  setLocale(locale) {
    return this.locale = locale;
  }

  getMessages() {
    return this.messages[this.locale];
  }

  msg(path, props = {}) {
    return <MessageComponent messages={this.getMessages()}
                             path={path}
                             component={FormattedMessage}
                             {...props} />
  }

  htmlMsg(path, props = {}) {
    return <MessageComponent messages={this.getMessages()}
                             path={path}
                             component={FormattedHTMLMessage}
                             {...props} />
  }
}

RestIntl.currency = function(value, currency, props = {}) {
  props.style = "currency"
  props.currency = currency;
  props = Object.assign({
    locales: Config.get('currencyLocale') || Config.get('locale') ||
    navigator.language || navigator.userLanguage,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }, props);

  return Intl.NumberFormat(props.locales, props).format(value);
}

module.exports = RestIntl;
