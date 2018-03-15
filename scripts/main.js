(function(window) {
  'use strict';

  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://localhost:2403/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;

  var RemoteDataStore = App.RemoteDataStore;
  var remoteDS = new RemoteDataStore(SERVER_URL);

  var CheckList = App.CheckList;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;

  var myTruck = new Truck('ncc-1701', remoteDS);
  window.myTruck = myTruck;

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function(data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  remoteDS.getAll(function(serverResponse) {
    serverResponse.forEach(function(order) {
      checkList.addRow.call(checkList, order);
    });
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);

  console.log(formHandler);
})(window);
