require('./multiplierTypes');

var LocalUtils = require('../helpers/utils');

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