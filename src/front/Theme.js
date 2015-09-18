import React from "react";
import { Styles } from "material-ui";
import Config from "../back/Config";

let Manager = new Styles.ThemeManager();

let Mixin = {
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext(){
    return {
      muiTheme: Manager.getCurrentTheme()
    }
  },

  componentWillMount() {
    let themeSetup = Config.get('themeSetup');
    if(themeSetup)
      themeSetup(Manager);
    else
      console.warn("The app is not configured with themeSetup option");
  },

  getCurrentTheme() {
    return Manager.getCurrentTheme();
  }
}

module.exports = {
  Mixin: Mixin,
  Manager: Manager,
  Styles: Styles
}
