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
  'last_check_issued_date' : Date,
  'check_amount' : { type: Number, 'default': 0 } ,
  'salary' : { type: Number, min: 50, 'default': 50 } ,
  'purchased_venues' : [String],
  'venues' : Array,
  'venues_last_updated' : Date,
  'level' : { type: Number, min: 1, max: 100, 'default': 1 } 
});

VenueSchema = new Schema({
   'id': {
      type: String,
      validate: [validatePresenceOf, 'Venue ID is required']
   },
   'owner_id': String,
   'name': String,
   'icon': String
});


User = mongoose.model('User', UserSchema);
Venue = mongoose.model('Venue', VenueSchema);
