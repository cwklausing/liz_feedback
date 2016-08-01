var mongoose = require('mongoose');
var express = require('express');
var groceryListRouter = require('./routes/groceryList');
var index = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', index);
app.use('/groceries', groceryListRouter);

var db = mongoose.connect('mongodb://localhost/grocery_list').connection;

db.once('open', function() {
  console.log('Connected to MongoDB');
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port);
});
