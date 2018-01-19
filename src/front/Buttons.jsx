import React from "react";
import { IconButton, SvgIcon, FloatingActionButton } from "material-ui";
import HelpOutlineIcon from "material-ui/svg-icons/action/help-outline";
import FileDownloadIcon from "material-ui/svg-icons/file/file-download";
import AddIcon from "material-ui/svg-icons/content/add";
import DeleteIcon from "material-ui/svg-icons/action/delete";
import createReactClass from "create-react-class";

var Button = createReactClass({
  render(){
    return(
      <IconButton {...this.props} >
        {this.props.svg}
      </IconButton>
    )
  }
});

var Delete = createReactClass({
  render(){
    return <Button onClick={this.props.onClick} svg={<DeleteIcon />} />;
  }
});

var Download = createReactClass({
  click(){
    window.open(this.props.url, "_blank");
  },

  render(){
    return <Button onClick={this.click} svg={<FileDownloadIcon />} />;
  }
});

var Help = createReactClass({
  render() {
    return <Button {...this.props} svg={<HelpOutlineIcon />} />;
  }
});

var FloatingAdd = createReactClass({
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
