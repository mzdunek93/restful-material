import React from "react";
import { range } from "underscore";
import { Toolbar,
         ToolbarGroup,
         DropDownMenu,
         Styles,
         Mixins } from "material-ui";

module.exports = React.createClass({
  mixins: [Mixins.StylePropable ],

  propTypes: {
    onPageChange: React.PropTypes.func.isRequired,
    onPerPageChange: React.PropTypes.func.isRequired,
    count: React.PropTypes.number.isRequired,
    page: React.PropTypes.number.isRequired,
    perPage: React.PropTypes.number.isRequired
  },

  perPageChange(_, __, item) {
    this.props.onPerPageChange(item.payload);
  },

  pageChange(e, page) {
    e.preventDefault();
    this.props.onPageChange(page);
  },

  menuItems: [
    {payload: 5, text: 5},
    {payload: 10, text: 10},
    {payload: 20, text: 20},
    {payload: 50, text: 50},
    {payload: 100, text: 100}
  ],

  render() {
    var styles = {
      toolbar: {
        fontWeight: Styles.Typography.fontWeightNormal,
        color: Styles.Typography.textLightBlack
      },

      pageLinks: {
        paddingLeft: '24px',
        lineHeight: '56px'
      },

      desc: {
        position: 'relative',
        top: '-24px'
      },

      a: {
        textDecoration: 'none',
        color: 'inherit'
      }
    };

    var pageLinks = range(this.props.count / this.props.perPage).map(function(i){
      var highlight = {}
      if(i === this.props.page)
        highlight.fontWeight = 'bold',
        highlight.color = Styles.Colors.pink500

      return (
        <span style={styles.pageLinks} className="pageLinks">
          <a href="#"
             key={"a" + i}
             style={this.mergeAndPrefix(styles.a, highlight)}
             onClick={function(e){this.pageChange(e, i)}.bind(this)}>
            {i + 1}
          </a>
        </span>
      )
    }.bind(this))

    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup style={styles.group} key={0} float="left" >
          {pageLinks}
        </ToolbarGroup>
        <ToolbarGroup style={styles.group} key={1} float="right" >
          <span style={styles.desc}>
            Items per page
          </span>
          <span>
            <DropDownMenu menuItems={this.menuItems}
                          onChange={this.perPageChange} />
          </span>
        </ToolbarGroup>
      </Toolbar>
    )
  }
});
