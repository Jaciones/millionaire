var LocalUtils = require('../helpers/utils');

app.post('/bank/cash_check', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   User.findOne({
      'foursquare_id': user_id
   }, function(err, user) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      cashCheck(user, function() {
         res.render('bank', {
            user: user
         });
      });
   });
});

app.get('/bank/cash_check', function(req, res) {
   res.writeHead(303, {
      "location": "/bank"
   });
});

app.get('/bank', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   User.executeOnUser(user_id, function(user) {
      setCheckAmount(user, function() {
         res.render('bank', {
            user: user
         });
      });
   });
});

function cashCheck(user, callback) {
   if (user.check_amount > 0) {
      user.bank_balance = user.bank_balance + 1000;//user.salary;
      user.check_amount = 0;
      user.next_check_issue_date = Date.now().addMinutes(2);
   }
   user.save(function(err) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback();
   });
}

function setCheckAmount(user, callback) {
   user.setCheckAmount();
   user.save(function(err) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback();
   });
}