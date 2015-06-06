var isModel = (value)=> {
  return Array.isArray(value) &&
    value[1] && typeof(value[1]) === "object" &&
    value[1].map && value[1].errors
}

class Serialization {
  static write(model) {
    return JSON.stringify(model.asJSON());
  }

  static read(string, models) {
    return this.readModel(JSON.parse(string), models);
  }

  static readModel(read, models) {
    var [root, rest] = [read[0], read[1]];

    var constructor = models[root];
    var model = new constructor();
    model.errors = rest.errors;

    for(var key in rest.map) {
      var value = rest.map[key];

      if(Array.isArray(value) && isModel(value[0]))
        model.set(key, value.map((v)=> this.readModel(v, models)));
      else if(isModel(value))
        model.set(key, this.readModel(value, models));
      else
        model.set(key, value);
    }

    return model;
  }
}

module.exports = Serialization;
