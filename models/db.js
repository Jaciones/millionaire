var mongoose = require('mongoose');
mongoose.connect("mongodb:jaciones:ha7141@dbh23.mongolab.com:27237/jaciones");
Schema = mongoose.Schema;

function validatePresenceOf(value) {
  return value && value.length;
}

UserSchema = new Schema({
  'foursquare_id': { type: String, validate: [validatePresenceOf, 'Foursquare ID is required'] },
  'full_name': String,
  'first_name': String,
  'last_name': String,
  'access_token': { type: String, validate: [validatePresenceOf, 'Foursquare access_token is required'] },
  'bank_balance' : { type: Number, 'default': 0.0 },
  'next_check_issue_date' : { type: Date, 'default': new Date() },
  'check_amount' : { type: Number, 'default': 0 } ,
  'salary' : { type: Number, min: 200, 'default': 200 } ,
  'purchased_venues' : Array,
  'venues' : Array,
  'venues_last_updated' : Date,
  'level' : { type: Number, min: 1, max: 100, 'default': 1 },
  'xp' : { type: Number, min: 1, 'default': 1 }
});

VenueSchema = []; // We current use Foursquare json as schema.

FriendListSchema = new Schema({
   'user_id': {
      type: String,
      validate: [validatePresenceOf, 'Venue ID is required']
   },
   'friends': Array,
   'next_update_date' : { type: Date, 'default': new Date() }
});


User = mongoose.model('User', UserSchema);
Venue = VenueSchema;
FriendList = mongoose.model('FriendList', FriendListSchema);

require('../models/venue');
require('../models/user');
require('../models/friendList');
