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
import CountriesSelectField from './front/CountriesSelectField';
import RestDatePicker from './front/RestDatePicker';
import RestSelectField from './front/RestSelectField';
import RestField from './front/RestField';
import RestInput from './front/RestInput';
import Table from './front/table/Table';
import Info from './front/Info';
import Confirm from './front/Confirm';

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
  CountriesSelectField: CountriesSelectField,
  RestDatePicker: RestDatePicker,
  RestSelectField: RestSelectField,
  RestField: RestField,
  RestInput: RestInput,
  Table: Table,
  Info: Info,
  Confirm: Confirm,
  Config: Config,
  configure: configure
};
