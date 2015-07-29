import React from "react";
import { range } from "underscore";
import { Toolbar,
         ToolbarGroup,
         DropDownMenu,
         Styles,
         Mixins,
         FloatingActionButton } from "material-ui";

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
    {payload: 5, text: 'Items per page 5'},
    {payload: 10, text: 'Items per page 10'},
    {payload: 20, text: 'Items per page 20'},
    {payload: 50, text: 'Items per page 50'}
  ],

  render() {
    var styles = {
      toolbar: {
        fontWeight: Styles.Typography.fontWeightNormal,
        color: Styles.Typography.textLightBlack,
        borderTop: `1px solid ${ Styles.Colors.grey300 }`,
        backgroundColor: Styles.Colors.white
      },

      pageLinks: {

        container: {
          position: 'absolute',
          top: 7,
          display: 'flex'
        },

        floatingActionButton: {
          margin: '0 4px'
        }
      },

      span: {
        lineHeight: 40,
        color: Styles.Colors.Gray
      }
    };

    var pageLinks = range(this.props.count / this.props.perPage).map(function(i){
      var secondary = true
      var highlight = {}
      if(i === this.props.page)
        secondary = false
        highlight.fontWeight = 'bold',
        highlight.color = Styles.Colors.white

      return (
        <FloatingActionButton mini={true}
                              linkButton={true}
                              secondary={secondary}
                              onClick={function(e){this.pageChange(e, i)}.bind(this)}
                              key={"a" + i}
                              style={this.mergeAndPrefix(styles.pageLinks.floatingActionButton, highlight)}>

          <span style={styles.span}>
            {i + 1}
          </span>
        </FloatingActionButton>
      )
    }.bind(this))

    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarGroup key={0} float="left" >
          <div style={styles.pageLinks.container}>
            {pageLinks}
          </div>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right" >
          <span>
            <DropDownMenu menuItems={this.menuItems}
                          onChange={this.perPageChange}
                          selectedIndex={this.menuItems.map(function(i) { return i.payload; }).indexOf(this.props.perPage)} />
          </span>
        </ToolbarGroup>
      </Toolbar>
    )
  }
});
