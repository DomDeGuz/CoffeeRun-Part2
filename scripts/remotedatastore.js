(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }
    this.serverUrl = url;
  }

  RemoteDataStore.prototype.add = function(key, val) {
    $.post(this.serverUrl, val, function(serverResponse) {
      console.log(serverResponse);
      return serverResponse;
    });

  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.get(this.serverUrl + '/' + key, function(serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function(key) {
    var id;
    this.getAll((function(serverResponse) {
      serverResponse.forEach(function(item) {
        id = item.id;
      });
      $.ajax(this.serverUrl + '/' + id, {
        type: 'DELETE'
      });
    }).bind(this));
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
