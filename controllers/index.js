var LocalUtils = require('../helpers/utils');

app.get('/', function(req, res) {
   console.log("index");
   if (LocalUtils.getCookie('user_id', req)) {
      redirectHome(LocalUtils.getCookie('user_id', req), res);
      return;
   }

   res.render('index', {
      layout: false,
      user_id: LocalUtils.getCookie('user_id', req)
   });
});

app.get('/login', function(req, res) {
   res.writeHead(303, {
      "location": Foursquare.getAuthClientRedirectUrl()
   });
   res.end();
});

app.get('/callback', function(req, res) {
   console.log("Callback");
   Foursquare.getAccessToken({
      code: req.query.code
   }, function(error, accessToken) {
      if (error) {
         res.send("An error was thrown: " + error.message);
      }
      else {
         User.login(accessToken, function(user_id) {
            redirectHome(user_id, res);
         });
      }
   });
});

function redirectHome(user_id, res) {
   res.cookie('user_id', user_id, {
      httpOnly: true
   });
   res.writeHead(303, {
      "location": "/home"
   });
   res.end();
}