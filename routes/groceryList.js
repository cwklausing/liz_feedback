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

/**
 * Stuff added by Connor Below
 */

//This delete route captures the :id by using req.params
router.delete('/delete/:id', function(req, res) {
  var id = req.params.id;
  Grocery.findByIdAndRemove(id, function(err) {
    if(err){
      res.sendStatus(500);
    } else {
      res.send(200);
    }
  })
})
//The put route takes in the entire data object from the client side, and can
//be accessed using req.body.
router.put('/put', function(req, res) {
  var obj = req.body;

  //Using mongoose method findByIdAndUpdate to update the specific record.
  //Go to http://mongoosejs.com/docs/api.html and find Model.findByIdAndUpdate
  //for documentation.
  Grocery.findByIdAndUpdate(obj._id, obj, function(err) {
    if(err){
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
})

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
