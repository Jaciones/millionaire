var LocalUtils = require('../helpers/utils');

app.get('/home', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
    var justCashed = (req.params.cashed=='true');
    
   User.executeOnUser(user_id, function(user) {
      var bankNotify = Date.now() > user.next_check_issue_date ? "notice yellow" : "hide";
      res.render('home', {
         user: user,
         bank_notice : bankNotify,
         just_cached : justCashed,
         javascripts : ["/javascripts/home.js?234223"]
      });
   });
});
