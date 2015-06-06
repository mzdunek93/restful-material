class Ajax {
  constructor(opts = {}) {
    if(opts.url)
      this.url = opts.url;
    else
      throw new Error(`${opts} should have the url key`);

    this.beforeSend = opts.beforeSend || (() => {})
    this.onSuccess  = opts.onSuccess  || (() => {});
    this.onFailure  = opts.onFailure  || (() => {});
  }

  resolve(xhr, resolve) {
    var response = JSON.parse(xhr.responseText || '{}');
    this.onSuccess(response);
    resolve(response);
  }

  reject(xhr, reject) {
    this.onFailure(xhr);
    reject(xhr);
  }

  send(method, path, data) {
    return new Promise(
      (resolve, reject)=> {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.OPENED) {
            xhr.setRequestHeader("Content-Type",
                                 "application/json;charset=utf-8");
            this.beforeSend(xhr);
          }

          if (xhr.readyState === XMLHttpRequest.DONE)
            if(xhr.status === 200)
              this.resolve(xhr, resolve);
            else
              this.reject(xhr, reject);
        }
        xhr.open(method, this.url + path, true);

        xhr.send(JSON.stringify(data));
      }
    )
  }

  get(path) {
    return this.send('GET', path, '');
  }

  post(path, data) {
    return this.send('POST', path, data);
  }

  put(path, data) {
    return this.send('PUT', path, data);
  }

  destroy(path){
    return this.send('DELETE', path, '');
  }
};

module.exports = Ajax;
