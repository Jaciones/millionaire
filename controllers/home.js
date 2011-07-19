var config = {
   "secrets": {
      "clientId": "A1NL3FU1D1QS2SH5YCXQX5D4Y1NMQUXRKV0HZOBBIADI4CBH",
      "clientSecret": "UEFWAG4WSEAY5S3QIN1AS3ULF30HAZZGEOEGHCG0N2Z0AMLS",
      "redirectUrl": "http://jaciones_test_repository.jaciones.cloud9ide.com/callback"
   }
}

var Foursquare = require("node-foursquare")(config);

app.get('/', function(req, res) {
   res.render('index', {
      title: 'Express',
      bar: 'Bar'
   });
});

app.get('/login', function(req, res) {
   console.log("login");
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
   res.writeHead(303, {
      "location": "/home"
   });
   res.end(); 
         // Save the accessToken and redirect.
      }
   });
});