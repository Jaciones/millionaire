var LocalUtils = require('../helpers/utils');

app.get('/home', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   
   User.executeOnUser(user_id, function(user) {
      res.render('home', {
         user: user
      });
   });
});
