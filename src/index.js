import Ajax from './back/Ajax';
import Model from './back/Model';
import Intl from './back/Intl';
import Store from './back/store';
import Config from './back/config';
import Buttons from './front/Buttons';
import CountriesDropDownMenu from './front/CountriesDropDownMenu';
import RestDatePicker from './front/RestDatePicker';
import RestDropDownMenu from './front/RestDropDownMenu';
import RestField from './front/RestField';
import RestInput from './front/RestInput';
import Spinner from './front/Spinner';
import Table from './front/Table';

var configure = (opts)=> Config.store(opts)

module.exports = {
  Ajax: Ajax,
  Intl: Intl,
  Model: Model,
  Store: Store,
  Buttons: Buttons,
  CountriesDropDownMenu: CountriesDropDownMenu,
  RestDatePicker: RestDatePicker,
  RestDropDownMenu: RestDropDownMenu,
  RestField: RestField,
  RestInput: RestInput,
  Spinner: Spinner,
  Table: Table,
  configure: configure
};
