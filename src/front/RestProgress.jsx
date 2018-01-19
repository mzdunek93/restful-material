import React from "react";
import { CircularProgress } from "material-ui";
import createReactClass from "create-react-class";

module.exports = createReactClass({
  render() {
    return <CircularProgress {...this.props} />
  }
});
