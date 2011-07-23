var mongoose = require('mongoose');
var db = mongoose.connect("mongodb:jaciones:ha7141@dbh23.mongolab.com:27237/jaciones");

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

exports.DB = {
   'User' : mongoose.model('User')
};
