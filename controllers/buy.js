var LocalUtils = require('../helpers/utils');

app.get('/buy', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   executeOnUser(user_id, function(user) {
      getVenuesAsNecessary(user, function(venues, err) {
         res.render('buy', {
            layout: false,
            title: 'Express',
            venues: venues
         });
      });      
   });
});

app.post('/buy/venue', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   var venue_id = 
   executeOnUser(user_id, function(user) {
   


   });
   
});

function executeOnUser(user_id, func) {
   User.findOne({
      'foursquare_id': user_id
   }, function(err, user) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      func(user);
   });
}

function getVenuesAsNecessary(user, callback) {
   // If it's been less than 4 hours since last check, dont make call to Foursquare
   if (user.venues_last_updated && Date.today().addHours(-4) < user.venues_last_updated) {
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