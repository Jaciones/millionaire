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

   User.findOne({
      'foursquare_id': user_id
   }, function(err, user) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      setCheckAmount(user, function() {
         res.render('bank', {
            user: user
         });
      });
   });
});

function cashCheck(user, callback) {
   console.log("cashCheck", user);

   if (user.check_amount > 0) {
      user.bank_balance = user.bank_balance + user.salary;
      user.check_amount = 0;
      user.last_check_issued_date = new Date();
   }
   user.save(function(err) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      console.log("end cashCheck", user);

      callback();
   });
}

function setCheckAmount(user, callback) {
   console.log("SetCgeck", user);
   if (user.last_check_issued_date) {
      if (Date.today().addHours(-24) > user.last_check_issued_date) {
         console.log("date", Date.today().addHours(-24), user.last_check_issued_date);
         user.check_amount = user.salary;
      }
   }
   else {
      console.log("default");
      user.check_amount = user.salary;
   }
   user.save(function(err) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback();
   });
}