import React from "react";
import mui from "material-ui";
import Router from "react-router";

var HelpSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
</svg>

var EditSvg = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
  <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/>
</svg>

var DownloadSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M19 9h-4v-6h-6v6h-4l7 7 7-7zm-14 9v2h14v-2h-14z"/>
  <path d="M0 0h24v24h-24z" fill="none"/>
</svg>

var DeleteSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>

var InfoSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>

var Button = React.createClass({
  render(){
    return(
      <mui.IconButton onClick={this.props.onClick}
                      className={this.props.className}
                      tooltip={this.props.tooltip}
                      touch={this.props.touch} >
        {this.props.svg}
      </mui.IconButton>
    )
  }
});

var RaisedButton = React.createClass({
  render(){
    return (
      <mui.RaisedButton onClick={this.props.onClick}
                      className={this.props.className}
                      secondary={this.props.secondary}
                      linkButon={this.props.linkButon} >
        <span className="svg-button-icon"> {this.props.svg} </span>
        <span className="mui-raised-button-label">{this.props.label}</span>
      </mui.RaisedButton>
    )
  }
});

var Edit = React.createClass({
  mixins: [Router.Navigation],

  click(){
    this.context.router.transitionTo(this.props.to);
  },

  render(){
    return <Button onClick={this.props.onClick || this.click} svg={EditSvg} />;
  }
});

var Delete = React.createClass({
  render(){
    return <Button onClick={this.props.onClick} svg={DeleteSvg} />;
  }
});

var Download = React.createClass({
  mixins: [Router.Navigation],

  click(){
    window.open(this.props.url, "_blank");
  },

  render(){
    return <Button onClick={this.click} svg={DownloadSvg} />;
  }
});

var Info = React.createClass({
  render() {
    return <Button {...this.props} svg={InfoSvg} />;
  }
});

var Help = React.createClass({
  render() {
    return <Button {...this.props} svg={HelpSvg} />;
  }
});

var DownloadRaised  = React.createClass({
  mixins: [Router.Navigation],

  click(){
    window.open(this.props.url, "_blank");
  },

  render(){
    return <RaisedButton {...this.props} onClick={this.click} svg={DownloadSvg} />;
  }
});

module.exports = {
  Edit: Edit,
  Delete: Delete,
  Download: Download,
  Info: Info,
  Help: Help,
  DownloadRaised: DownloadRaised
};
