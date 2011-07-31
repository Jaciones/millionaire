var LocalUtils = require('../helpers/utils');

app.get('/venue/:venue_id', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   var venue_id = req.params.venue_id;
   var multipliers = MultiplierTypes.getAvailable();
   
   User.executeOnUser(user_id, function(user) {
      var venue = user.findVenue(venue_id);
      
       res.render('venue', {
            user: user,
            venue: venue,
            multipliers: multipliers
         });
   });
});