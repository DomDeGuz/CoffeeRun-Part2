(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-payment="form"]';
  var App = window.App;

  var FormHandler = App.FormHandler;
  var CheckList = App.CheckList;

  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    console.log();
  });
  console.log(formHandler);
})(window);
