import _ from "underscore";

class Model {
  constructor(map = {}){
    this.map = map;
    this.errors = {};
 }

  get(key) {
    return this.map[key]
  }

  set(key, value) {
    return this.map[key] = value;
  }

  update(map) {
    this.map = _.extend(this.map, map);
    return this;
  }

  merge(other) {
    return this.update(other.map);
  }

  toObject(){
    return this.map;
  }

  toString(){
    return this.get('id')
  }

  errorMessages () {
    var messages = [];
    _.each(this.errors, (msg, attribute) =>{
      if(msg instanceof Array) msg = msg.join('. ');
      messages.push(`${attribute.replace("_", " ")}: ${msg}`);
    })
    return messages;
  }

  isBlank(attribute) {
    var value = this.get(attribute);
    return _.isNull(value) || _.isUndefined(value) || value === '';
  }

  setDefault(attribute, value) {
    if(this.isBlank(attribute))
      this.set(attribute, value);
  }

  asJSON(keys) {
    if(!keys)
      keys = Object.keys(this.map)
    var out = {};

    keys.forEach((key)=> out[key] = this.get(key));
    return out;
  }
}

module.exports = Model;
