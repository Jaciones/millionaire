VenueList.getOrCreateVenueListForUser = function(user_id, callback) {
    VenueList.findOne({
        'user_id': user_id
    }, function(err, venueList) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        if (venueList) {
            venueList.updateIfNecessary(function(resultVenueList) {
                callback(resultVenueList);
            });
            return;
        }

        var newVenueList = new VenueList();
        newVenueList.user_id = user_id;
        newVenueList.save(function(saveError) {
            if (saveError) {
                LocalUtils.throwError(newVenueList);
            }
            newVenueList.updateIfNecessary(function(resultVenueList) {
                callback(resultVenueList);
            });
        });
    });
};

VenueList.prototype.updateIfNecessary = function(callback) {
    var _this = this;
    if (this.next_update < new Date().addMinutes(1)) {
        User.executeOnUser(this.user_id, function(user) {
            VenueList.getAllAvailableForUserFromFoursquare(user.access_token, function(err, venues) {
                if (err || !venues) {
                    LocalUtils.throwError(err);
                }
                _this.data = venues;
                _this.next_update = new Date().addHours(24);
                _this.save(function(saveError) {
                    if (saveError) {
                        LocalUtils.throwError(saveError);
                    }
                    callback(_this);
                });
            });
        });
    }
    else {
        callback(_this);
    }
};

VenueList.getAllAvailableForUserFromFoursquare = function(access_token, callback) {
    Foursquare.Users.getVenueHistory('self', null, access_token, function(err, data) {
        if (err) {
            callback(err, null);
	        return;
        }
        var venues = data.venues.items;
        for (var i = 0; i < venues.length; i++) {
            Venue.assignValue(venues[i]);
        }
        callback(err, venues.sort(Venue.sortByUserVisits));
    });
};