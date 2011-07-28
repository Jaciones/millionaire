var LocalUtils = require('../helpers/utils');

app.get('/buy', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   User.executeOnUser(user_id, function(user) {
      getVenuesAsNecessary(user, function(venues, err) {
         res.render('buy', {
            layout: false,
            venues: venues
         });
      });
   });
});

app.post('/buy/venue', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   var venue_id = req.body.venue_id;
   console.log("buying", user_id);

   User.executeOnUser(user_id, function(user) {
      user.purchaseVenue(venue_id);
      user.save(function(err) {
         if (err) {
            LocalUtils.throwError(err);
            return;
         }
         res.writeHead(303, {
            "location": "/portfolio"
         });
         res.end();
      });

   });

});

function getVenuesAsNecessary(user, callback) {
   // If it's been less than 4 hours since last check, dont make call to Foursquare
   if (user.venues_last_updated && Date.today() > user.venues_last_updated) {
      callback(user.venues);
      return;
   }
   console.log("Getting all Venues");

   Venue.getAllAvailableForUser(user.access_token, function(err, venues) {
      if (err) {
         callback(null, err);
      }
      else {
         user.venues = venues;
         user.venues_last_updated = new Date();
         user.save(function(err) {
            callback(user.venues, err);
         });
      }
   });
}