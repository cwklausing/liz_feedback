angular.module('groceryApp', []);

angular.module('groceryApp').controller('GroceryController', function($http) {
  var vm = this;

  vm.items = [];
  vm.quantities = [];

  function showGroceries() {
    $http.get('/groceries').then(function(response) {
      vm.items = response.data;
      vm.quantities = response.data;
    })
  };

  showGroceries();

  vm.add = function() {
    console.log('Clicked add');

    var sendData = {};

    sendData.item = vm.item;
    sendData.quantity = vm.quantity;

    function handleAddSuccess() {
      console.log('Success posting new item!');
      showGroceries();
    };

    function handleFailure() {
      console.log('Failure posting new item');
    };

    $http.post('/groceries/add', sendData).then(handleAddSuccess, handleFailure);
  };

  //see comments in groceryList router
  
  // vm.update = function(itemInput) {
  //   vm.item = itemInput.item;
  //   vm.quantity = itemInput.quantity;
  // };
  //
  // vm.delete = function(item) {
  //   response.send(item);
  //
  // };
});
