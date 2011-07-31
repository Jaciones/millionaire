require('./multiplierTypes');

var LocalUtils = require('../helpers/utils');

Multiplier.findAllForUser = function(user_id, func) {
   Multiplier.find({
      'user_id': user_id
   }, function(err, multipliers) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      func(multipliers);
   });
};

Multiplier.findAllForVenue = function(venue_id, func) {
   Multiplier.find({
      'venue_id': venue_id
   }, function(err, multipliers) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      func(multipliers);
   });
};
