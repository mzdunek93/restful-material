import React from "react";
import { extend, isFunction } from "underscore";
import { IntlMixin } from "react-intl";
import { Table, TextField } from "material-ui";
import Controls from "./Controls";

module.exports = React.createClass({
  mixins: [IntlMixin],

  propTypes: {
    spec: React.PropTypes.object.isRequired,
    resources: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      pendingMessage: "Loading...",
      headers: {},
      pagination: true,
      perPage: 10,
      page: 0
    }
  },

  getInitialState() {
    return {
      perPage: this.props.perPage,
      page: this.props.page,
      resourcesFn: this.props.pagination ? this.subset : this.all,
      controlsFn: this.props.pagination ? this.controls : ()=> <span />
    };
  },

  pageChange(page) {
    this.setState({page: page})
  },

  perPageChange(perPage) {
    var length = (this.state.filtered || this.props.resources).length;
    if((perPage * this.state.page) > length)
      this.setState({perPage: perPage, page: parseInt(length / perPage)});
    else
      this.setState({perPage: perPage})
  },

  translateMaybe(title) {
    if(this.props.messages)
      return this.getIntlMessage(title)
    else
      return title
  },

  filteredResources(title, filterValue) {
    filterValue = filterValue.toString().toLowerCase();

    var resources = this.state.filtered;
    var out = [];

    if((resources || []).length === 0)
      resources = this.props.resources;

    for(var i = 0; i < resources.length; i++){
      var val = resources[i].get(this.props.spec[title]);
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

  controls(resources) {
    return <Controls onPageChange={this.pageChange}
                     onPerPageChange={this.perPageChange}
                     count={resources.length}
                     page={this.state.page}
                     perPage={this.state.perPage} />;
  },

  headerColumns() {
    return Object.keys(this.props.spec).reduce((out, title)=>
      extend(out, {
        [title]: {
          content: (
            <div>
              <div> {this.translateMaybe(title)} </div>
              <div> {this.filter(title)} </div>
            </div>
          )
        }
      }),
      {})
  },

  rowData(resources) {
    return resources.map((r, i)=> {
      return Object.keys(this.props.spec).reduce((out, title)=> {
        var field = this.props.spec[title];
        var content;
        if(isFunction(field))
          content = field(r, i);
        else
          content = r.get(field);
        return extend(out, {[title]: {content: content}});
      }, {})
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
        <Table headerColumns={this.headerColumns()}
               columnOrder={Object.keys(this.props.spec)}
               rowData={this.rowData(this.state.resourcesFn(resources))}
               {...this.props} />
        {this.state.controlsFn(resources)}
      </div>
    )
  }
});
