"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ajax = (function () {
  function Ajax() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Ajax);

    if (opts.url) this.url = opts.url;else throw new Error("" + opts + " should have the url key");

    this.beforeSend = opts.beforeSend || function () {};
    this.onSuccess = opts.onSuccess || function () {};
    this.onFailure = opts.onFailure || function () {};
  }

  _createClass(Ajax, [{
    key: "resolve",
    value: function resolve(xhr, _resolve) {
      var response = JSON.parse(xhr.responseText || "{}");
      this.onSuccess(response);
      _resolve(response);
    }
  }, {
    key: "reject",
    value: function reject(xhr, _reject) {
      this.onFailure(xhr);
      _reject(xhr);
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

          if (xhr.readyState === XMLHttpRequest.DONE) if (xhr.status === 200) _this.resolve(xhr, resolve);else _this.reject(xhr, reject);
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