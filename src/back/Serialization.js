import Config from "./Config";

var isSerializedModel = (value)=> {
  return Array.isArray(value) &&
    value[1] && typeof(value[1]) === "object" &&
    value[1].map && value[1].errors
}

var mapping = function() {
  var constMapping = Config.get('constMapping');
  if(!constMapping)
    throw new Error("Please configure the app with constMapping")
  return constMapping;
}

var className = function(model) {
  var constMapping = mapping(),
      name;

  for(var key in constMapping)
    if(model instanceof constMapping[key])
      name = key;

  return name;
}

var writeModel = function(model) {
  var out = {}, isModel = (value)=> value && className(value)

  for(var key in model.map) {
    var value = model.map[key];

    if(Array.isArray(value) && isModel(value[0]))
      out[key] = value.map((v)=> writeModel(v));
    else if(isModel(value))
      out[key] = writeModel(value);
    else
      out[key] = value;
  }

  var name = className(model);
  if(!name)
    throw new Error(`Class of ${model} is missing from constMapping`)

  return [name, {map: out, errors: model.errors}];
}

var readModel = function(read) {
  var [root, rest] = [read[0], read[1]];

  var constructor = mapping()[root];
  var model = new constructor();
  model.errors = rest.errors;

  for(var key in rest.map) {
    var value = rest.map[key];

    if(Array.isArray(value) && isSerializedModel(value[0]))
      model.set(key, value.map((v)=> readModel(v)));
    else if(isSerializedModel(value))
      model.set(key, readModel(value));
    else
      model.set(key, value);
  }

  return model;
}

module.exports = {
  write: (model)=> JSON.stringify(writeModel(model)),
  read:  (string)=> readModel(JSON.parse(string))
};
