import React from "react";
import { IconButton, SvgIcon, FloatingActionButton } from "material-ui";
import HelpOutlineIcon from "material-ui/svg-icons/action/help-outline";
import FileDownloadIcon from "material-ui/svg-icons/file/file-download";
import AddIcon from "material-ui/svg-icons/content/add";
import DeleteIcon from "material-ui/svg-icons/action/delete";


var Button = React.createClass({
  render(){
    return(
      <IconButton {...this.props} >
        {this.props.svg}
      </IconButton>
    )
  }
});

var Delete = React.createClass({
  render(){
    return <Button onClick={this.props.onClick} svg={<DeleteIcon />} />;
  }
});

var Download = React.createClass({
  click(){
    window.open(this.props.url, "_blank");
  },

  render(){
    return <Button onClick={this.click} svg={<FileDownloadIcon />} />;
  }
});

var Help = React.createClass({
  render() {
    return <Button {...this.props} svg={<HelpOutlineIcon />} />;
  }
});

var FloatingAdd = React.createClass({
  render() {
    return (
      <FloatingActionButton
        primary={true}
        linkButton={true}
        href={this.props.href}
        style={{position: 'absolute', top: -28, right: 40}} >
        <AddIcon />
      </FloatingActionButton>
    )
  }
});

module.exports = {
  Delete: Delete,
  Download: Download,
  Help: Help,
  FloatingAdd: FloatingAdd
};
