import IntlLib from "intl";

import Ajax from './back/Ajax';
import Model from './back/Model';
import Proxy from './back/Proxy';
import Intl from './back/Intl';
import createStore from './back/createStore';
import Config from './back/Config';
import Serialization from './back/Serialization';
import Savepoint from './back/Savepoint';
import Buttons from './front/Buttons';
import CountriesDropDownMenu from './front/CountriesDropDownMenu';
import RestDatePicker from './front/RestDatePicker';
import RestDropDownMenu from './front/RestDropDownMenu';
import RestField from './front/RestField';
import RestInput from './front/RestInput';
import Table from './front/table/Table';
import Info from './front/Info';

var configure = (opts)=> Config.store(opts)

module.exports = {
  Ajax: Ajax,
  Intl: Intl,
  Model: Model,
  Proxy: Proxy,
  Serialization: Serialization,
  Savepoint: Savepoint,
  createStore: createStore,
  Buttons: Buttons,
  CountriesDropDownMenu: CountriesDropDownMenu,
  RestDatePicker: RestDatePicker,
  RestDropDownMenu: RestDropDownMenu,
  RestField: RestField,
  RestInput: RestInput,
  Table: Table,
  Info: Info,
  Config: Config,
  configure: configure
};
