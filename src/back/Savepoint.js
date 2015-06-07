/*global localStorage*/

import Serialization from "./Serialization"
var key = 'savePoint';

var savedResource = () => {
  var stored = localStorage.getItem(key);
  if(stored)
    return Serialization.read(stored);
  else
    return null;
}

var save = (model) => {
  return localStorage.setItem(key, Serialization.write(model))
}

var unsave = (arg) => {
  localStorage.removeItem(key);
  return arg;
}

var Mixin = {
  getInitialState() {
    return {
      resource: savedResource()
    }
  }
}

module.exports = {
  Mixin: Mixin,
  savedResource: savedResource,
  save: save,
  unsave: unsave
}
