import React from "react";
import { IntlMixin } from "react-intl";
import { Table,
         TextField,
         TableHeader,
         TableBody,
         TableHeaderColumn,
         TableRow,
         TableRowColumn } from "material-ui";
import Controls from "./Controls";
import Config from "../../back/Config";
import { without, uniq, isDate, extend, isFunction } from "underscore";

module.exports = React.createClass({
  mixins: [IntlMixin],

  propTypes: {
    spec: React.PropTypes.object.isRequired,
    resources: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      tableProps: {
        multiSelectable: false,
        selectable: false
      },
      bodyProps: {
        displayRowCheckbox: false
      },
      headerProps: {
        adjustForCheckbox: false,
        displaySelectAll: false,
        enableSelectAll: false
      },
      rowPropsFn: ()=> {},
      pendingMessage: "Loading...",
      headers: {},
      pagination: true,
      perPage: 10,
      page: 0
    }
  },

  getInitialState() {
    return {
      perPage: parseInt(window.localStorage.getItem('perPage') || this.props.perPage),
      page: this.props.page,
      activeFilters: [],
      resourcesFn: this.props.pagination ? this.subset : this.all,
      controlsFn: this.props.pagination ? this.controls : ()=> <span />
    };
  },

  pageChange(page) {
    this.setState({page: page});
  },

  perPageChange(perPage) {
    window.localStorage.setItem('perPage', perPage);
    var length = (this.state.filtered || this.props.resources).length;
    if((perPage * this.state.page) > length)
      this.setState({perPage: perPage, page: parseInt(length / perPage)});
    else
      this.setState({perPage: perPage});
  },

  translateMaybe(title) {
    if(this.props.messages && title)
      return this.getIntlMessage(title);
    else
      return title;
  },

  filteredResources(title, filterValue, resources = this.state.filtered) {
    filterValue = filterValue.toString().toLowerCase();

    var out = [];

    if((resources || []).length === 0)
      resources = this.props.resources;

    for(var i = 0; i < resources.length; i++){
      var val = resources[i].get(this.props.spec[title]);
      // TODO: maybe for performance is better to use Regexp instead?
      if((val && val.toString().toLowerCase().indexOf(filterValue) !== -1) ||
        filterValue === '')
        out.push(resources[i]);
    }

    return out;
  },

  removeFilter(title) {
    var out;

    for(var i = 0; i < this.state.activeFilters.length; i++)
      out = this.filteredResources(this.state.activeFilters[i], '', this.props.resources);

    this.setState({
      filtered: out,
      activeFilters: without(this.state.activeFilters, title)
    });
  },

  updateFilter(title) {
    var filterValue = this.refs[title].getValue();

    if(filterValue === '')
      this.removeFilter(title);
    else
      this.setState({
        filtered: this.filteredResources(title, filterValue),
        activeFilters: uniq(this.state.activeFilters.concat([title]))
      });
  },

  filter(title) {
    if(this.props.headers[title])
      return this.props.headers[title]();
    else if(isFunction(this.props.spec[title]))
      return '';
    else
      return (
        <TextField ref={title}
                   autoComplete="false"
                   style={{display: 'table-cell'}}
                   onChange={this.updateFilter.bind(this, title)} />
      );
  },

  // Cannot use getDefaultProps for this since it is cached upon class creation.
  // And at this point locale is not set yet.
  currentLocale() {
    return this.props.locale || Config.get('locale') ||
      navigator.language || navigator.userLanguage
  },

  controls(resources) {
    return <Controls onPageChange={this.pageChange}
                     onPerPageChange={this.perPageChange}
                     count={resources.length}
                     page={this.state.page}
                     perPage={this.state.perPage} />;
  },

  headerColumns() {
    return Object.keys(this.props.spec).map((title, i)=>
      <TableHeaderColumn key={i}>
        {this.translateMaybe(title)}
        {this.filter(title)}
      </TableHeaderColumn>)
  },

  body(resources) {
    return resources.map((r, i)=> {
      return <TableRow {...this.props.rowPropsFn(r)} key={i}>
        {Object.keys(this.props.spec).map((title)=> {
          var field = this.props.spec[title];
          var content;
          if(isFunction(field))
            content = field(r, i);
          else
            content = r.get(field);

          if(isDate(content))
            content = content.toLocaleDateString(this.currentLocale());

          return <TableRowColumn>{content}</TableRowColumn>
        })};
      </TableRow>
    });
  },

  subset(resources) {
    var subset = [];
    var start = this.state.page * this.state.perPage;
    var stop = start + this.state.perPage;
    if(stop > resources.length)
      stop = resources.length;

    for(let i = start; i < stop; i++)
      subset.push(resources[i]);

    return subset;
  },

  all(resources) {
    return resources;
  },

  render() {
    var resources = this.state.filtered || this.props.resources;

    if(!resources)
      return <div />

    return (
      <div>
        <Table {...this.props.tableProps} >
          <TableHeader {...this.props.headerProps} >
            <TableRow>{this.headerColumns()}</TableRow>
          </TableHeader>
          <TableBody {...this.props.bodyProps} >
            {this.body(this.state.resourcesFn(resources))}
          </TableBody>
        </Table>

        {this.state.controlsFn(resources)}
      </div>
    )
  }
});
