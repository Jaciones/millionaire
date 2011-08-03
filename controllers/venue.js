var LocalUtils = require('../helpers/utils');
var facebookReturnUrl = "http://www.example.com/response/";
app.get('/venue/:venue_id', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.params.venue_id;
    var multipliers = MultiplierTypes.getAvailable();
    var facebookReturnUrl = "http://millionaire.jaciones.cloud9ide.com/fb_callback?venue_id=" + venue_id;
    var facebookPostUrl = "http://www.facebook.com/dialog/feed?app_id=213700678680339&redirect_uri=" + facebookReturnUrl + "&amp;link=http://developers.facebook.com/docs/reference/dialogs/&amp;message=Come%20join%20the%20fun%20at%20Fourmillionaire.com!&picture=http://fbrell.com/f8.jpg&amp;caption=Fourmillionaire.com&amp;description=If%20you%20use%20Foursquare%20and%20have%20friends,%20you%20will%20have%20fun%20playing%20Fourmillionaire!&amp;name=Fourmillionaire;";
    var twitterPostUrl = "https://twitter.com/intent/user?text=Come%20play%Fourmillionaire%20with%me!";
    User.executeOnUser(user_id, function(user) {
        var venue = user.findVenue(venue_id);
        res.render('venue', {
            user: user,
            venue: venue,
            facebookPostUrl: facebookPostUrl,
            multipliers: multipliers
        });
    });
});
app.post('/venue/:venue_id/buy_multiplier', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.params.venue_id;
    var mult_id = req.body.mult_id;
    
    User.executeOnUser(user_id, function(user) {
        user.purchaseMultiplier(venue_id, mult_id);
        user.save(function(err) {
            if (err) {
                LocalUtils.throwError(err);
                return;
            }
            user.purchased_venues.forEach(function(venue) {
              console.log("foo", venue);
            });
            res.writeHead(303, {
                "location": "/portfolio"
            });
            res.end();
        });
    });
});