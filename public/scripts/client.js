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

  /**
   * Things added by Connor
     */

  //Pass in grocery item ID to be deleted from the database
  vm.delete = function(id) {
    $http.delete('/groceries/delete/' + id)
        .then(
            function(res){
              console.log(res);
              showGroceries();
            },
            function(res){
              console.log("Error: ", res);
            }
        )
  };
  //Pass in the entire item object to be passed to the database for update
  vm.update = function(myObject){
    console.log(myObject);
    $http.put('/groceries/put', myObject)
        .then(
            function(res){
              console.log(res);
              showGroceries();
            },
            function(res){
              console.log("Error: ", res);
            }
        )
  }


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
