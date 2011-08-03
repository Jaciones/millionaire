var LocalUtils = require('../helpers/utils');

app.get('/portfolio', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   User.executeOnUser(user_id, function(user) {
       user.purchased_venues.forEach(function(v) {
          console.log("bar",v); 
       });
       res.render('portfolio', {
            user: user,
            venues: user.purchased_venues
         });
   });
});