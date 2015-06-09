import Config from "./Config";

//TODO: far from perfect, but probably it's flawed by design
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

var mapOverObject = function(value, fun) {
  var out = {};
  for(var key in value) out[key] = fun(value[key]);
  return out;
}

var classNameOrError = function(model) {
  var name = className(model);
  if(!name)
    throw new Error(`Class of ${model} is missing from constMapping`)
  return name;
}

var isModel = function(value){
  return value && className(value);
}

var initModel = function(value) {
  var [root, rest] = [value[0], value[1]];
  var constructor = mapping()[root];
  var model = new constructor();
  model.errors = rest.errors;
  model.map = read(rest.map);
  return model;
}

var write = function(value) {
  if(isModel(value))
    return [
      classNameOrError(value),
      write({map: value.map, errors: value.errors})
    ];
  else if(Array.isArray(value))
    return value.map((v)=> write(v));
  else if(typeof(value) === 'object')
    return mapOverObject(value, write);
  else
    return value;
}

var read = function(value) {
  if(isSerializedModel(value))
    return initModel(value);
  else if(Array.isArray(value))
    return value.map((r)=> read(r));
  else if(typeof(value) === 'object')
    return mapOverObject(value, read);
  else
    return value;
}

module.exports = {
  write: (value)=> JSON.stringify(write(value)),
  read:  (string)=> read(JSON.parse(string))
};
