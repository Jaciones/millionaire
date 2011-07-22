var mongoose = require('mongoose');
var host = "staff.mongohq.com";
var database = "jaciones";
var port = "10072";
var callback = "jaciones";
var username = "jaciones@gmail.com";
var pass = "ha7141";

var db = mongoose.connect("jaciones:ha7141@dbh23.mongolab.com:27237/jaciones");

var Schema = mongoose.Schema;

function validatePresenceOf(value) {
  return value && value.length;
}

User = new Schema({
  'foursquare_id': { type: String, validate: [validatePresenceOf, 'Foursquare ID is required'], index: { unique: true } },
  'full_name': String,
  'first_name': String,
  'last_name': String,
  'access_token': { type: String, validate: [validatePresenceOf, 'Foursquare access_token is required'], index: { unique: true } }
});

mongoose.model('User', User);
var user_model = mongoose.model('User');

var instance = new user_model();
instance.foursquare_id = 'hello';
instance.access_token = "sdfsadf";
instance.save(function (err) {
  console.log(err);
});

console.log("fff");
user_model.find({}, function (err, docs) {
   console.log("find");
   console.log(docs);
});

user_model.find().all(function(user) {
  console.log('aaa');
  console.log(user);
});


exports.DB = {
   'User' : mongoose.model('User')
};