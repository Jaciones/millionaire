var db = require('../models/db').DB;

var config = {
   "secrets": {
      "clientId": "A1NL3FU1D1QS2SH5YCXQX5D4Y1NMQUXRKV0HZOBBIADI4CBH",
      "clientSecret": "UEFWAG4WSEAY5S3QIN1AS3ULF30HAZZGEOEGHCG0N2Z0AMLS",
      "redirectUrl": "http://jaciones_test_repository.jaciones.cloud9ide.com/callback"
   }
};

var Foursquare = require("node-foursquare")(config);

app.get('/', function(req, res) {
   res.render('index', {
      title: 'Express',
      bar: 'Bar'
   });
});

app.get('/home', function(req, res) {

   var callback = function() {
         res.render('index', {
            title: 'Express',
            bar: 'Bar'
         });
       }
       
//   var checkins = Foursquare.getCheckins([userId], [params], accessToken, callback);

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

         res.writeHead(303, {
            "location": "/home"
         });
         res.end();
      }
   });
});

function login(accessToken, res) {
   Foursquare.Users.getUser('self', accessToken, function(err_foursquare, foursquare_user) {
      if (err_foursquare) {
         res.send("An error was thrown in getUser: " + err_foursquare.message);
      }else {
         var foursquare_id = foursquare_user.user.id;
         console.log("here");
         console.log(foursquare_id);
         console.log(foursquare_user);
         console.log(db.User.findOne({ 'foursquare_id' : 'sadfdfsdffsadfdsa'}));

         db.User.findOne({ 'foursquare_id': foursquare_id }, function(err, user) {
            if (err) { 
               console.log("err here");
               res.send("An error was thrown in logn: " + err.message);
               res.writeHead(303, {
                  "location": "/home"
               });
               res.end();
               return; 
            }
            console.log("Got user");
            console.log(user);
         
            if (!user) {
               var newUser = new User();
               newUser.foursquare_id = user.id;
               newUser.full_name = user.first_name + user.last_name;
               newUser.first_name = user.first_name;
               newUser.last_name = user.last_name;
               newUser.access_token = access_token;
               
               newUser.save(function(err2) {
                  console.log("Failed to save user:" + err2);
               });            }
            //
         });
      }
});

}