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
      setCheckAmount(user);
      res.render('bank', {
         user: user
      });
   });
});

function setCheckAmount(user) {
   if (user.last_check_issued_date) {
      if (Date.today().addHours(-24) > user.last_check_issued_date) {
         user.check_amount = user.salary;         
      }
   }else {
      user.check_amount = user.salary;
   }
}