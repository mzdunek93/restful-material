class Proxy {
  constructor(models){
    this.models = models;
  }

  get(args) {
    var model = this.models[args[0]];
    if(model)
      return model.get(args[1])
    else
      throw new Error(`${model} is not set. Maybe you meant ${this.models}?`);
  }
}

module.exports = Proxy;
