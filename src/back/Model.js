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

  klass() {
    throw new Error("this method should return name of the class");
  }

  asJSON() {
    var out = {}, respondsTo = (value)=> value && value['asJSON'];

    for(var key in this.map){
      var value = this.map[key];
      if(Array.isArray(value) && respondsTo(value[0]))
        out[key] = value.map((v)=> v.asJSON());
      else if(respondsTo(value))
        out[key] = value.asJSON();
      else
        out[key] = value;
    }

    return [this.klass(), {map: out, errors: this.errors}];
  }
}

module.exports = Model;
