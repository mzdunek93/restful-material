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
};

module.exports = Model;
