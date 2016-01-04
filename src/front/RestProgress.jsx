import React from "react";
import { CircularProgress } from "material-ui";

module.exports = React.createClass({
  render() {
    return <CircularProgress {...this.props} />
  }
});
