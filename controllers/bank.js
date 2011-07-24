var LocalUtils = require('../helpers/utils');

app.get('/bank', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   User.findOne({
      'foursquare_id': user_id
   }, function(err, user) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      console.log("Found user");
      res.render('bank', {
         user: user
      });
   });
});