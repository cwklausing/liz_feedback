var router = require('express').Router();

var Grocery = require('../models/groceryList');

router.get('/', function(request, response) {
  Grocery.find({}, function(err, groceries) {
    if(err) {
      console.log('Error finding groceries', err);
      response.sendStatus(500);
    } else {
      response.send(groceries);
    }
  })
});

router.post('/add', function(request, response) {
  console.log('Adding a grocery item');
  var data = request.body;

  var groceryItem = new Grocery({
    item: data.item,
    quantity: data.quantity
  });

  groceryItem.save(function(err) {
    if(err) {
      console.log('Error saving', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

//not sure if I've actually deleted or changed items in a database before
//I never made it to the Hard or Pro modes on the assignments of this nature
//I think I'd use put and delete, but beyond that...
//I wish I had asked for help sooner, I thought maybe I'd get it but NOPE


// var db = new Db('test', new Server('localhost', 27017));
// db.open(function(err, db) {
//   db.collection //no idea if I'm on the right track here, saw this on the Google
// })
//
// router.delete('/')

module.exports = router;
