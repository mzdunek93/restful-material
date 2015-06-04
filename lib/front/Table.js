"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _materialUi = require("material-ui");

var Controls = _react2["default"].createClass({
  displayName: "Controls",

  propTypes: {
    onPageChange: _react2["default"].PropTypes.func.isRequired,
    onPerPageChange: _react2["default"].PropTypes.func.isRequired,
    count: _react2["default"].PropTypes.number.isRequired,
    page: _react2["default"].PropTypes.number.isRequired,
    perPage: _react2["default"].PropTypes.number.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      headers: {}
    };
  },

  perPageChange: function perPageChange(_, __, item) {
    this.props.onPerPageChange(item.payload);
  },

  pageChange: function pageChange(e, page) {
    e.preventDefault();
    this.props.onPageChange(page);
  },

  menuItems: [{ payload: 5, text: 5 }, { payload: 10, text: 10 }, { payload: 20, text: 20 }, { payload: 50, text: 50 }, { payload: 100, text: 100 }],

  render: function render() {
    var pageLinks = _underscore2["default"].range(this.props.count / this.props.perPage).map((function (i) {
      var style = { textDecoration: "none", color: "inherit" };
      if (i === this.props.page) style.fontWeight = "bold", style.color = "#ff4081";

      return _react2["default"].createElement(
        "span",
        { className: "pageLinks" },
        _react2["default"].createElement(
          "a",
          { href: "#",
            key: "a" + i,
            style: style,
            onClick: (function (e) {
              this.pageChange(e, i);
            }).bind(this) },
          i + 1
        )
      );
    }).bind(this));

    return _react2["default"].createElement(
      _materialUi.Toolbar,
      { className: "mui-toolbar-sort" },
      _react2["default"].createElement(
        _materialUi.ToolbarGroup,
        { key: 0, float: "left" },
        pageLinks
      ),
      _react2["default"].createElement(
        _materialUi.ToolbarGroup,
        { key: 1, float: "right" },
        _react2["default"].createElement(
          "span",
          null,
          "Items per page"
        ),
        _react2["default"].createElement(
          "span",
          null,
          _react2["default"].createElement(_materialUi.DropDownMenu, { menuItems: this.menuItems,
            onChange: this.perPageChange })
        )
      )
    );
  }
});

var Table = _react2["default"].createClass({
  displayName: "Table",

  propTypes: {
    data: _react2["default"].PropTypes.object.isRequired,
    resources: _react2["default"].PropTypes.array.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pendingMessage: "Loading..."
    };
  },

  getInitialState: function getInitialState() {
    return { page: 0, perPage: 5, filtered: this.props.resources };
  },

  resources: function resources(_resources) {
    // if filtered is not yet set resort to this.props.resources
    var start = this.state.page * this.state.perPage,
        out = [];
    if (start > _resources.length - 1) start = _resources.length - this.state.perPage;
    if (start < 0) start = 0;

    for (var i = start; i < start + this.state.perPage && i < _resources.length; i++) out.push(_resources[i]);

    return out;
  },

  pageChange: function pageChange(page) {
    this.setState({ page: page });
  },

  perPageChange: function perPageChange(perPage) {
    this.setState({ perPage: perPage });
  },

  thead: function thead() {
    return _react2["default"].createElement(
      "tr",
      null,
      _underscore2["default"].keys(this.props.data).map(function (h, i) {
        return _react2["default"].createElement(
          "th",
          { key: i },
          h
        );
      })
    );
  },

  tbody: function tbody(resources) {
    var _this = this;

    if (resources) return this.resources(resources).map(function (r, i) {
      var row = [];
      Object.keys(_this.props.data).map(function (title) {
        var val = _this.props.data[title];
        if (_underscore2["default"].isFunction(val))
          // bind 'this' to have router
          row.push(_this.wrapInTd(val.bind(_this)(r, i), title, "cell-with-button"));else row.push(_this.wrapInTd(r.get(val), title));
      });
      return _react2["default"].createElement(
        "tr",
        { key: i },
        row
      );
    });else return _react2["default"].createElement(
      "tr",
      null,
      _react2["default"].createElement(
        "td",
        { colSpan: Object.keys(this.props.data).length },
        this.props.pendingMessage
      )
    );
  },

  wrapInTd: function wrapInTd(html, title) {
    var className = arguments[2] === undefined ? "" : arguments[2];

    return _react2["default"].createElement(
      "td",
      { "data-title": title, className: className },
      html
    );
  },

  filteredResources: function filteredResources(filterName, filterValue) {
    var resources = this.props.resources,
        out = [];
    filterValue = filterValue.toString().toLowerCase();

    for (var i = 0; i < resources.length; i++) {
      var val = resources[i].get(this.props.data[filterName]);
      // TODO: maybe for performance is better to use Regexp instead?
      if (val.toString().toLowerCase().indexOf(filterValue) !== -1) out.push(resources[i]);
    }

    return out;
  },

  updateFilter: function updateFilter(title) {
    var filterValue = this.refs[title].getValue();
    this.setState({ filtered: this.filteredResources(title, filterValue) });
  },

  filters: function filters() {
    var _this2 = this;

    return _react2["default"].createElement(
      "tr",
      null,
      Object.keys(this.props.data).map(function (title) {
        if (_this2.props.headers[title]) return _react2["default"].createElement(
          "th",
          { "data-title": title },
          _this2.props.headers[title]()
        );else if (_underscore2["default"].isFunction(_this2.props.data[title])) return _react2["default"].createElement("th", { "data-title": title });else return _react2["default"].createElement(
          "th",
          { "data-title": title },
          _react2["default"].createElement(_materialUi.TextField, { ref: title,
            className: "table-filter",
            onChange: _this2.updateFilter.bind(_this2, title) })
        );
      })
    );
  },

  controls: function controls(resources) {
    if (resources && resources.length > this.state.perPage) return _react2["default"].createElement(Controls, { onPageChange: this.pageChange,
      onPerPageChange: this.perPageChange,
      count: resources.length,
      page: this.state.page,
      perPage: this.state.perPage });else return _react2["default"].createElement("span", null);
  },

  render: function render() {
    var resources = this.state.filtered || this.props.resources;

    return _react2["default"].createElement(
      "div",
      { className: "table-responsive-vertical shadow-z-1" },
      _react2["default"].createElement(
        "table",
        { className: "table table-hover table-mc-light-blue table-with-filters" },
        _react2["default"].createElement(
          "thead",
          null,
          this.thead(),
          this.filters()
        ),
        _react2["default"].createElement(
          "tbody",
          null,
          this.tbody(resources)
        )
      ),
      this.controls(resources)
    );
  }
});

module.exports = Table;