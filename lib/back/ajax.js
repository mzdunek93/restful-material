"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = (function () {
  function Ajax() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Ajax);

    if (opts.url) this.url = opts.url;else throw new Error("" + opts + " should have the url key");

    this.beforeSend = opts.beforeSend || function () {};

    this.context = opts.context || {};
    this.callbacks = opts.callbacks || {};
  }

  _createClass(Ajax, [{
    key: "runCallback",
    value: function runCallback(xhr, resolve, reject) {
      var callback = this.callbacks[xhr.status];
      if (callback) {
        callback(xhr, this.context, resolve, reject);
        return true;
      } else return false;
    }
  }, {
    key: "send",
    value: function send(method, path, data) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.OPENED) {
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            _this.beforeSend(xhr);
          }

          if (xhr.readyState === XMLHttpRequest.DONE) if (xhr.status === 200) resolve(JSON.parse(xhr.responseText || "{}"));else _this.runCallback(xhr, resolve, reject) || reject(xhr);
        };
        xhr.open(method, _this.url + path, true);

        xhr.send(JSON.stringify(data));
      });
    }
  }, {
    key: "get",
    value: function get(path) {
      return this.send("GET", path, "");
    }
  }, {
    key: "post",
    value: function post(path, data) {
      return this.send("POST", path, data);
    }
  }, {
    key: "put",
    value: function put(path, data) {
      return this.send("PUT", path, data);
    }
  }, {
    key: "destroy",
    value: function destroy(path) {
      return this.send("DELETE", path, "");
    }
  }]);

  return Ajax;
})();

;

module.exports = Ajax;