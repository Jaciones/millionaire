var LocalUtils = require('../helpers/utils');

app.get('/portfolio', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   User.executeOnUser(user_id, function(user) {
       console.log(user.purchased_venues); 
       res.render('portfolio', {
            venues: user.purchased_venues
         });
   });
});