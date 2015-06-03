import React from "react";
import _ from "underscore";
import { Toolbar,
         ToolbarGroup,
         TextField,
         DropDownMenu } from "material-ui";

var Controls = React.createClass({
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
    var pageLinks = _.range(this.props.count / this.props.perPage).map(function(i){
      var style = {textDecoration: 'none', color: 'inherit'};
      if(i === this.props.page)
        style.fontWeight = 'bold',
        style.color = '#ff4081'

      return (
        <span className="pageLinks">
          <a href="#"
             key={"a" + i}
             style={style}
             onClick={function(e){this.pageChange(e, i)}.bind(this)}>
            {i + 1}
          </a>
        </span>
      )
    }.bind(this))

    return (
      <Toolbar className="mui-toolbar-sort">
        <ToolbarGroup key={0} float="left" >
          {pageLinks}
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right" >
          <span>
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

var Table = React.createClass({
  propTypes: {
    spec: React.PropTypes.object.isRequired,
    resources: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      pendingMessage: "Loading..."
    }
  },

  getInitialState() {
    return {page: 0, perPage: 5, filtered: this.props.resources};
  },

  resources(resources) {
    // if filtered is not yet set resort to this.props.resources
    var start = this.state.page * this.state.perPage,
        out = [];
    if(start > (resources.length - 1))
      start = resources.length - this.state.perPage;
    if(start < 0)
      start = 0;

    for(var i = start; (i < start + this.state.perPage) && (i < resources.length); i++)
      out.push(resources[i])

    return out
  },

  pageChange(page) {
    this.setState({page: page})
  },

  perPageChange(perPage) {
    this.setState({perPage: perPage})
  },

  thead() {
    return (
      <tr>
        {_.keys(this.props.spec).map((h, i)=>
          <th key={i}>{h}</th>)}
      </tr>
    );
  },

  tbody(resources) {
    if(resources)
      return this.resources(resources).map((r, i)=>{
        var row = [];
        Object.keys(this.props.spec).map((title)=>{
          var val = this.props.spec[title];
          if(_.isFunction(val))
            // bind 'this' to have router
            row.push(this.wrapInTd(val.bind(this)(r, i), title, 'cell-with-button'))
          else
            row.push(this.wrapInTd(r.get(val), title))
        });
        return <tr key={i}>{row}</tr>;
      });
    else
      return (
        <tr>
          <td colSpan={Object.keys(this.props.spec).length}>
            {this.props.pendingMessage}
          </td>
        </tr>
      )
  },

  wrapInTd(html, title, className = '') {
    return (
      <td data-title={title} className={className}>
        {html}
      </td>
    )
  },

  filteredResources(filterName, filterValue) {
    var resources = this.props.resources,
        out = [];
    filterValue = filterValue.toString().toLowerCase();

    for(var i = 0; i < resources.length; i++){
      var val = resources[i].get(this.props.spec[filterName]);
      // TODO: maybe for performance is better to use Regexp instead?
      if(val.toString().toLowerCase().indexOf(filterValue) !== -1)
        out.push(resources[i])
    }

    return out;
  },

  updateFilter(title) {
    var filterValue = this.refs[title].getValue();
    this.setState({filtered: this.filteredResources(title, filterValue)});
  },

  filters() {
    return (
      <tr>
        {Object.keys(this.props.spec).map((title)=> {
          if(_.isFunction(this.props.spec[title]))
            return <th data-title={title}></th>;
          else
            return (
              <th data-title={title}>
                <TextField ref={title}
                           className="table-filter"
                           onChange={this.updateFilter.bind(this, title)} />
              </th>
            );
         })}
      </tr>
    );
  },

  controls(resources) {
    if(resources && resources.length > this.state.perPage)
      return <Controls onPageChange={this.pageChange}
                       onPerPageChange={this.perPageChange}
                       count={resources.length}
                       page={this.state.page}
                       perPage={this.state.perPage} />;
    else
      return <span />;
  },

  render() {
    var resources = this.state.filtered || this.props.resources;

    return (
      <div className="table-responsive-vertical shadow-z-1">
        <table className="table table-hover table-mc-light-blue table-with-filters">
          <thead>
            {this.thead()}
            {this.filters()}
          </thead>
          <tbody>
            {this.tbody(resources)}
          </tbody>
        </table>
        {this.controls(resources)}
      </div>

    )
  }
});

module.exports = Table;
