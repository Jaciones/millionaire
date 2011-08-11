require('./multiplierTypes');

var LocalUtils = require('../helpers/utils');
Multiplier = [];

Multiplier.findAllForUser = function(user_id, callback) {
   Multiplier.find({
      'user_id': user_id
   }, function(err, multipliers) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback(multipliers);
   });
};

Multiplier.findAllForVenue = function(venue_id, callback) {
   Multiplier.find({
      'venue_id': venue_id
   }, function(err, multipliers) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback(multipliers);
   });
};

Multiplier.findAllForVenues = function(venue_ids, callback) {
   Multiplier.find({
      'venue_id' : { $in : venue_ids}
   }, function(err, multipliers) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback(multipliers);
   });
};

Multiplier.removeFromVenue = function(user, venue_id, mult_type) {
    var new_purchased_venues = [];
    if (!user.purchased_venues) {
        return;
    }
    user.purchased_venues.forEach(function(venue) {
        console.log("Venue", venue.venue.id, venue_id, venue.multipliers);
        if (venue.venue.id == venue_id && venue.multipliers) {
            var new_multipliers = venue.multipliers.slice(0);
            for(var i=0; i< new_multipliers.length; i++) {
                console.log("new_multipliers[i].id",new_multipliers[i].id, mult_type);
                if (new_multipliers[i].id == mult_type) {
                    console.log("removing");
                    if (new_multipliers.length == 1) {
                        new_multipliers = [];
                    } else {
                        new_multipliers = new_multipliers.slice(i,1);
                    }
                    break;
                }
            }
            console.log("new_multipliers",new_multipliers);
            venue.multipliers = new_multipliers;
        }
        new_purchased_venues.push(venue);
    });
    user.purchased_venues = new_purchased_venues;
};
