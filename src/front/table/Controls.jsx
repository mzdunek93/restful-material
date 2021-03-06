import React from "react";
import { range } from "underscore";
import { Toolbar,
         ToolbarGroup,
         ToolbarTitle,
         Styles,
         FloatingActionButton } from "material-ui";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";

module.exports = createReactClass({
  propTypes: {
    onPageChange: PropTypes.func.isRequired,
    onPerPageChange: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired
  },

  perPageChange(e, n) {
    e.preventDefault();
    this.props.onPerPageChange(n);
  },

  pageChange(e, page) {
    e.preventDefault();
    this.props.onPageChange(page);
  },

  menuItems: [5, 10, 20, 50],

  render() {
    var styles = {
      toolbar: {
        fontWeight: Styles.Typography.fontWeightNormal,
        borderTop: `1px solid ${ Styles.Colors.grey300 }`,
        backgroundColor: Styles.Colors.white
      },

      toolbarTitle: {
        color: Styles.Colors.Black,
        fontSize: '1em'
      },

      span: {
        lineHeight: '56px'
      },

      a: {
        color: Styles.Colors.Black,
        padding: '10px',
        cursor: 'pointer'
      },

      active: {
        color: Styles.Colors.red900,
        textDecoration: 'none',
        fontWeight: 500
      }
    };

    var pageLinks = range(this.props.count / this.props.perPage).map(function(i){
      var active = {};
      if(i === this.props.page)
        active = styles.active;

      return (
        <span style={styles.span} key={i} >
          <a onClick={function(e){this.pageChange(e, i)}.bind(this)}
             style={this.mergeAndPrefix(styles.a, active)} >
            {i + 1}
          </a>
        </span>
        
      )
    }.bind(this))

    var perPage = this.menuItems.map(function (i) {
      var active = {};
      if(i === this.props.perPage)
        active = styles.active;

      return (
        <span key={i} style={styles.span}>
          <a style={this.mergeAndPrefix(styles.a, active)}
             onClick={function(e){this.perPageChange(e, i)}.bind(this)} >
            {i}
          </a>
        </span>
      )
    }.bind(this))

    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup float="left" >
          {pageLinks}
        </ToolbarGroup>
        <ToolbarGroup float="right" >
          <ToolbarTitle text="items per page" style={styles.toolbarTitle} />
          {perPage}
        </ToolbarGroup>
      </Toolbar>
    )
  }
});
