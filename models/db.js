var mongoose = require('mongoose');

mongoose.connect("mongodb:jaciones:ha7141@dbh23.mongolab.com:27237/jaciones");
var Schema = mongoose.Schema;

function validatePresenceOf(value) {
    return value && value.length;
}

NotificationSchema = new Schema({
    'user_id': {
        type: String,
        validate: [validatePresenceOf, 'UserID is required'],
        index: true
    },
    'created_at' : { type: Date, 'default': Date.now },
    'description' : String,
    'is_read' : { type: Boolean, 'default':false},
    'data': Array
});
Notification = mongoose.model('Notification', NotificationSchema);

VenueListSchema = new Schema({
    'user_id': {
        type: String,
        validate: [validatePresenceOf, 'UserID is required'],
        index: true
    },
    'next_update': {
        type: Date,
        'default': new Date()
    },
    'data': Array
});
VenueList = mongoose.model('VenueList', VenueListSchema);

PurchasedVenueSchema = new Schema({
    'venue_id': {
        type: String,
        validate: [validatePresenceOf, 'VenueID is required'],
        index: true
    },
    'venue_data': Array,
    'multipliers': Array
});
PurchasedVenue = mongoose.model('PurchasedVenue', PurchasedVenueSchema);

UserSchema = new Schema({
    'foursquare_id': {
        type: String,
        validate: [validatePresenceOf, 'Foursquare ID is required'],
        index: true
    },
    'first_name': String,
    'last_name': String,
    'photo_url': String,
    'access_token': {
        type: String
    },
    'bank_balance': {
        type: Number,
        'default': 0.0
    },
    'next_check_issue_date': {
        type: Date,
        'default': new Date()
    },
    'check_amount': {
        type: Number,
        'default': 0
    },
    'salary': {
        type: Number,
        min: 200,
        'default': 200
    },
    'purchased_venues': Array,
    'net_worth': {
        type: Number
    },
    'venues': Array,
    'venues_last_updated': Date,
    'level': {
        type: Number,
        min: 1,
        max: 100,
        'default': 1
    },
    'xp': {
        type: Number,
        min: 1,
        'default': 1
    }
});

UserSchema.pre('save', function(next) {
    this.net_worth = this.getNetWorth();
    next();
});
User = mongoose.model('User', UserSchema);

VenueSchema = []; // We current use Foursquare json as schema.

FriendListSchema = new Schema({
    'user_id': {
        type: String,
        validate: [validatePresenceOf, 'UserID is required'],
        index: true
    },
    'friends': Array,
    'next_update_date': {
        type: Date,
        'default': new Date()
    }
});
FriendList = mongoose.model('FriendList', FriendListSchema);
Venue = VenueSchema;
require('../models/venueList');
require('../models/venue');
//require('../models/notification');
require('../models/user');
require('../models/purchasedVenue');
require('../models/friendList');