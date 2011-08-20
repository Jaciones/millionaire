var LocalUtils = require('../helpers/utils');
var facebookReturnUrl = "http://www.example.com/response/";

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
            res.writeHead(303, {
                "location": "/portfolio"
            });
            res.end();
        });
    });
});

app.get('/venue_friend/:friend_id/venue/:venue_id', function(req, res) {
    var user_id = req.params.friend_id;
    var venue_id = req.params.venue_id;
    var multipliers = MultiplierTypes.getAvailable();

    User.executeOnUser(user_id, function(user) {
        var venue = user.findVenueInPurchased(venue_id);
        res.render('venue', {
            user: user,
            venue: venue,
            facebookPostUrl: null,
            multipliers: multipliers
        });
    });
});



app.get('/venue/delete/:venue_id/mult/:mult_type', function(req, res) {
    var mult_type = req.params.mult_type;
    var venue_id = req.params.venue_id;
    var multiplier = MultiplierTypes.findMultiplier(mult_type);

    res.render('conf_mult_delete', {
        layout: "layout_simple",
        venue_id: venue_id,
        mult_type: mult_type,
        multiplier: multiplier
    });
});

app.get('/venue/sell/:venue_id', function(req, res) {
	var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.params.venue_id;
	User.executeOnUser(user_id, function(user) {
		var venue = user.findVenueInPurchased(venue_id);
		res.render('conf_venue_sell', {
			layout: "layout_simple",
			venue: venue
		});
	});
});

app.post('/venue/sell', function(req, res) {
	var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.body.venue_id;

	User.executeOnUser(user_id, function(user) {
		var venue = user.sellVenue(venue_id, function() {
			user.save(function(err) {
				if (err) {
					LocalUtils.throwError(err);
					return;
				}
				res.redirect("/portfolio");
			});
		});
	});
});

app.post('/venue/delete_mult', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.body.venue_id;
    var mult_type = req.body.mult_type;
    User.executeOnUser(user_id, function(user) {
        Multiplier.removeFromVenue(user, venue_id, mult_type);
        console.log("User", user);
        user.save(function(err) {
            if (err) {
                LocalUtils.throwError(err);
                return;
            }
            res.redirect("/venue/"+user.id+"/"+venue_id);
        });
    });

});

app.get('/venue/:user_id/:venue_id', function(req, res) {
    var venue_id = req.params.venue_id;
    var logged_in_user_id = LocalUtils.getCookie('user_id', req);
    var user_id = req.params.user_id;
    var isSelf = logged_in_user_id === user_id;
    var multipliers = MultiplierTypes.getAvailable();
    var facebookReturnUrl = "http://millionaire.jaciones.cloud9ide.com/fb_callback?venue_id=" + venue_id;
    var facebookPostUrl = "http://www.facebook.com/dialog/feed?app_id=213700678680339&redirect_uri=" + facebookReturnUrl + "&amp;link=http://developers.facebook.com/docs/reference/dialogs/&amp;message=Come%20join%20the%20fun%20at%20Fourmillionaire.com!&picture=http://fbrell.com/f8.jpg&amp;caption=Fourmillionaire.com&amp;description=If%20you%20use%20Foursquare%20and%20have%20friends,%20you%20will%20have%20fun%20playing%20Fourmillionaire!&amp;name=Fourmillionaire;";
    var twitterPostUrl = "https://twitter.com/intent/user?text=Come%20play%Fourmillionaire%20with%me!";
    User.executeOnUser(user_id, function(user) {
        var venue = user.findVenueInPurchased(venue_id);
        res.render('venue', {
            user: user,
            venue: venue,
            facebookPostUrl: facebookPostUrl,
            multipliers: multipliers,
            isSelf: isSelf
        });
    });
});