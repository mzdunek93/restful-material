import Config from "./config";
import Ajax from "./ajax";

class Store {}

module.exports = (definition = {})=> {
  if(definition.ajax)
    throw new Error("Cannot define a function called ajax.");

  var store = new Store();
  for(var fun in definition)
    store[fun] = definition[fun];

  var ajaxOpts = Config.get('ajax')
  if(!ajaxOpts)
    throw new Error("The App should be configured with the ajax options")
  store.ajax = new Ajax(ajaxOpts);

  return store;
}
