import { Styles } from "material-ui";
import React from 'react/addons';

var utils = React.addons.TestUtils;
var ThemeManager = new Styles.ThemeManager();

var ContextWrapper = React.createClass({
  childContextTypes: {
    muiTheme: PropTypes.object
  },
  getChildContext: function() {
    return {muiTheme: ThemeManager.getCurrentTheme()}
  },
  render: function() {
    return this.props.render()
  }
})

var renderIntoDocument = function(component, props) {
  return utils.renderIntoDocument(React.createElement(ContextWrapper, {
    render: function() {
      props.ref = "element";
      return React.createElement(component, props)
    }
  }))
}

var renderToStaticMarkup = function(component, props) {
  return React.renderToStaticMarkup(React.createElement(ContextWrapper, {
    render: function() {
      return React.createElement(component, props)
    }
  }))
}

module.exports = {
  utils: utils,
  renderIntoDocument: renderIntoDocument,
  renderToStaticMarkup: renderToStaticMarkup,
  Wrapper: ContextWrapper
}
