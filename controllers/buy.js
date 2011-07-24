var LocalUtils = require('../helpers/utils');

app.get('/buy', function(req, res) {

   var user_id = LocalUtils.getCookie('user_id', req);
   var access_token = LocalUtils.getCookie('access_token', req);
   
   Venue.getAllAvailableForUser(access_token, function(err, venues) {
          res.render('buy', {
            title: 'Express',
            venues: venues
         });
   });

});