import React from "react";
import { CircularProgress } from "material-ui";
import Theme from "./Theme";

module.exports = React.createClass({
  mixins: [Theme.Mixin],

  render() {
    return <CircularProgress {...this.props} />
  }
});
