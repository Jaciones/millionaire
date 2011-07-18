var config = {
   "secrets": {
      "clientId": "CLIENT_ID",
      "clientSecret": "CLIENT_SECRET",
      "redirectUrl": "REDIRECT_URL"
   }
}

var foursquare = require("node-foursquare")(config);

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express',
    bar: 'Bar'
  });
});

app.get('/login', function(req, res) {
   res.writeHead(303, {
      "location": Foursquare.getAuthClientRedirectUrl()
   });
   res.end();
});

app.get('/callback', function(req, res) {
   Foursquare.getAccessToken({
      code: req.query.code
   }, function(error, accessToken) {
      if (error) {
         res.send("An error was thrown: " + error.message);
      }
      else {
         // Save the accessToken and redirect.
      }
   });
});