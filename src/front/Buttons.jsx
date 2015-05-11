import React from "react";
import mui from "material-ui";

var EditSvg = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
  <path d="M2 12.88V16h3.12L14 7.12 10.88 4 2 12.88zm14.76-8.51c.33-.33.33-.85 0-1.18l-1.95-1.95c-.33-.33-.85-.33-1.18 0L12 2.88 15.12 6l1.64-1.63z"/>
</svg>

var DownloadSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M19 9h-4v-6h-6v6h-4l7 7 7-7zm-14 9v2h14v-2h-14z"/>
  <path d="M0 0h24v24h-24z" fill="none"/>
</svg>

var DeleteSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>

var Button = React.createClass({
  render(){
    return(
      <mui.IconButton onClick={this.props.onClick} >
        {this.props.svg}
      </mui.IconButton>
    )
  }
});

var Edit = React.createClass({
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
  click(){
    window.open(this.props.url, "_blank");
  },

  render(){
    return <Button onClick={this.click} svg={DownloadSvg} />;
  }
});

module.exports = {
  Edit: Edit,
  Delete: Delete,
  Download: Download
};
