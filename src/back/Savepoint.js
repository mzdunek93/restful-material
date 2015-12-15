var Saves;

if ("development" !== process.env.NODE_ENV) {
  window.saves = {};
  Saves = window.saves;
} else
  Saves = {};

var Mixin = function(id){
  return {
    componentWillMount() {
      var savepoint = Saves[id];
      if(savepoint) {
        this.setState(savepoint);
        this.deleteSavepoint();
      }
    },

    makeSavepoint() {
      Saves[id] = this.state;
    },

    deleteSavepointMaybe(xhr) {
      if(xhr && xhr.status !== 401)
        this.deleteSavepoint();
      return xhr;
    },

    deleteSavepoint() {
      delete Saves[id];
    }
  }
}

module.exports = {
  Mixin: Mixin
}
