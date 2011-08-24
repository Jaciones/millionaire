var LocalUtils = require('../helpers/utils');

app.get('/buy', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);

    VenueList.getOrCreateVenueListForUser(user_id, function(venueList) {
        User.executeOnUser(user_id, function(user) {
            var availableVenues = [];
			var friendsVenues = {};

            venueList.data.forEach(function(venue) {
                if (!user.findVenueInPurchased(venue.venue.id)) {
                    availableVenues.push(venue);
                }
            });

	        FriendList.getFriendsAsUsers(user_id, function(users) {
		        users.forEach(function(friend_as_user) {
					friend_as_user.purchased_venues.forEach(function(friend_venue) {
						friendsVenues[friend_venue.venue.id] = friend_as_user;
					});
		        });

		        res.render('buy', {
		            layout: false,
		            venues: availableVenues,
			        friends_venues : friendsVenues,
			        user: user
		        });
	        });
        });
    });

});

app.post('/buy/venue', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    var venue_id = req.body.venue_id;

    User.executeOnUser(user_id, function(user) {
        console.log("Found user", user.id);
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