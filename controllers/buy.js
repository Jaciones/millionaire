var LocalUtils = require('../helpers/utils');

app.get('/buy', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);

    VenueList.getOrCreateVenueListForUser(user_id, function(venueList) {
        res.render('buy', {
            layout: false,
            venues: venueList.data
        });
    });

});

app.post('/buy/venue', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.body.venue_id;

    User.executeOnUser(user_id, function(user) {
        user.purchaseVenue(venue_id, function() {
            console.log("Saving user", user.purchased_venues);
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

});