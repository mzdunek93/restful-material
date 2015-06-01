'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _backAjax = require('./back/Ajax');

var _backAjax2 = _interopRequireDefault(_backAjax);

var _backModel = require('./back/Model');

var _backModel2 = _interopRequireDefault(_backModel);

var _backIntl = require('./back/Intl');

var _backIntl2 = _interopRequireDefault(_backIntl);

var _backStore = require('./back/store');

var _backStore2 = _interopRequireDefault(_backStore);

var _backConfig = require('./back/config');

var _backConfig2 = _interopRequireDefault(_backConfig);

var _frontButtons = require('./front/Buttons');

var _frontButtons2 = _interopRequireDefault(_frontButtons);

var _frontCountriesDropDownMenu = require('./front/CountriesDropDownMenu');

var _frontCountriesDropDownMenu2 = _interopRequireDefault(_frontCountriesDropDownMenu);

var _frontRestDatePicker = require('./front/RestDatePicker');

var _frontRestDatePicker2 = _interopRequireDefault(_frontRestDatePicker);

var _frontRestDropDownMenu = require('./front/RestDropDownMenu');

var _frontRestDropDownMenu2 = _interopRequireDefault(_frontRestDropDownMenu);

var _frontRestField = require('./front/RestField');

var _frontRestField2 = _interopRequireDefault(_frontRestField);

var _frontRestInput = require('./front/RestInput');

var _frontRestInput2 = _interopRequireDefault(_frontRestInput);

var _frontSpinner = require('./front/Spinner');

var _frontSpinner2 = _interopRequireDefault(_frontSpinner);

var _frontTable = require('./front/Table');

var _frontTable2 = _interopRequireDefault(_frontTable);

var configure = function configure(opts) {
  return _backConfig2['default'].store(opts);
};

module.exports = {
  Ajax: _backAjax2['default'],
  Intl: _backIntl2['default'],
  Model: _backModel2['default'],
  Store: _backStore2['default'],
  Buttons: _frontButtons2['default'],
  CountriesDropDownMenu: _frontCountriesDropDownMenu2['default'],
  RestDatePicker: _frontRestDatePicker2['default'],
  RestDropDownMenu: _frontRestDropDownMenu2['default'],
  RestField: _frontRestField2['default'],
  RestInput: _frontRestInput2['default'],
  Spinner: _frontSpinner2['default'],
  Table: _frontTable2['default'],
  configure: configure
};