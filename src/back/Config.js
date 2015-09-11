window.Config = {
  store: (opts)=> window.Config.opts = opts,
  get:   (opt)=>  (window.Config.opts || {})[opt]
}

module.exports = window.Config;
