var Config = {
  store: (opts)=> Config.opts = opts,
  get:   (opt)=>  (Config.opts || {})[opt]
}

module.exports = Config;
