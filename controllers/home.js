var db = require('../models/db').DB;
var LocalUtils = require('../helpers/utils');

var config = {
   "secrets": {
      "clientId": "A1NL3FU1D1QS2SH5YCXQX5D4Y1NMQUXRKV0HZOBBIADI4CBH",
      "clientSecret": "UEFWAG4WSEAY5S3QIN1AS3ULF30HAZZGEOEGHCG0N2Z0AMLS",
      "redirectUrl": "http://jaciones_test_repository.jaciones.cloud9ide.com/callback"
   }
};

var Foursquare = require("node-foursquare")(config);

app.get('/', function(req, res) {
   
   if (LocalUtils.getCookie('user_id', req) && LocalUtils.getCookie('access_token', req)) {
      redirectHome(LocalUtils.getCookie('user_id', req), LocalUtils.getCookie('access_token', req), res);
      return;
   }
   
   res.render('index', {
      title: 'Express',
      bar: 'Bar',
      user_id: LocalUtils.getCookie('user_id', req)
   });
});

app.get('/home', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   var access_token = LocalUtils.getCookie('access_token', req);
   
   var callback = function(err, data) {
      console.log("Checkins", data);
      var venues = data.venues.items;
      console.log("Venues", venues);
      
         res.render('home', {
            title: 'Express',
            venues: venues
         });
       };

    var checkins = Foursquare.Users.getVenueHistory('self', null, access_token, callback);
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
         login(accessToken, res);
      }
   });
});

function redirectHome(user_id, accessToken, res) {
   res.cookie('user_id', user_id, { httpOnly: true});
   res.cookie('access_token', accessToken, { httpOnly: true});
   res.writeHead(303, {
      "location": "/home"
   });
   res.end();
}

function login(accessToken, res) {
   Foursquare.Users.getUser('self', accessToken, function(err_foursquare, foursquare_user) {
      if (err_foursquare) {
         LocalUtils.throwError(err_foursquare);
         return;
      }
      else {
         foursquare_user = foursquare_user.user; // Get User
         var foursquare_id = foursquare_user.id;
         console.log("Foursquare User", foursquare_user);
         db.User.findOne({
            'foursquare_id': foursquare_id
         }, function(err, user) {
            if (err) {
               LocalUtils.throwError(err);
               return;
            }
            console.log("Found user");
            if (!user) {
               var newUser = new db.User();
               newUser.foursquare_id = foursquare_user.id;
               newUser.full_name = foursquare_user.firstName + " " + foursquare_user.lastName;
               newUser.first_name = foursquare_user.firstName;
               newUser.last_name = foursquare_user.lastName;
               newUser.access_token = accessToken;
               console.log("Saving User", newUser);
               newUser.save(function(saveError) {
                  if (saveError) {
                     LocalUtils.throwError(saveError);
                  }
                  redirectHome(foursquare_id, accessToken,  res);
                  return;
               });
            }
            
            redirectHome(foursquare_id, accessToken, res);
         });
      }
   });

}