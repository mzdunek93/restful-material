import React from "react";
import { extend, range, isFunction } from "underscore";
import { IntlMixin } from "react-intl";
import { Toolbar,
         Table,
         ToolbarGroup,
         TextField,
         DropDownMenu,
         Styles,
         Mixins } from "material-ui";

var Controls = React.createClass({
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

module.exports = React.createClass({
  mixins: [IntlMixin],

  propTypes: {
    spec: React.PropTypes.object.isRequired,
    resources: React.PropTypes.array.isRequired
  },

  getDefaultProps() {
    return {
      pendingMessage: "Loading...",
      headers: {}
    }
  },

  getInitialState() {
    return {
      page: 0,
      perPage: 5
    };
  },

  pageChange(page) {
    this.setState({page: page})
  },

  perPageChange(perPage) {
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
    if(resources && resources.length > this.state.perPage)
      return <Controls onPageChange={this.pageChange}
                       onPerPageChange={this.perPageChange}
                       count={resources.length}
                       page={this.state.page}
                       perPage={this.state.perPage} />;
    else
      return <span />;
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

  render() {
    var resources = this.state.filtered || this.props.resources;

    if(!resources)
      return <div />

    return (
      <div>
        <Table headerColumns={this.headerColumns()}
               columnOrder={Object.keys(this.props.spec)}
               rowData={this.rowData(this.subset(resources))}
               {...this.props} />
        {this.controls(resources)}
      </div>
    )
  }
});
