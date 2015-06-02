import Config from "./Config";
import Ajax from "./Ajax";

class Store {}

var mixer = function(base, mixins) {
  mixins.forEach(function(mixin) {
    for(var name in mixin) {
      if(base[name])
        throw new Error(`A mixin overwrites a property called "${name}"`);

      base[name] = mixin[name];
    }
  })
}

module.exports = (definition = {})=> {
  if(definition.ajax)
    throw new Error("Cannot define a function called ajax.");

  var store = new Store();

  if(definition.mixins) {
    mixer(definition, definition.mixins, store);
    delete definition.mixins;
  }

  for(var fun in definition){
    var def = definition[fun];
    store[fun] = typeof def === 'function' ? def.bind(store) : def;
  }

  var ajaxOpts = Config.get('ajax')
  if(!ajaxOpts)
    throw new Error("The App should be configured with the ajax options")
  store.ajax = new Ajax(ajaxOpts);

  return store;
}
