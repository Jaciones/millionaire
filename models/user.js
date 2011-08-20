var LocalUtils = require('../helpers/utils');

User.executeOnUser = function(user_id, func) {
    User.findOne({
        _id: user_id
    }, function(err, user) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        func(user);
    });
};

User.executeOnUserFoursquareId = function(foursquare_id, func) {
    User.findOne({
        'foursquare_id': foursquare_id
    }, function(err, user) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        func(user);
    });
};

User.prototype.purchaseVenue = function(venue_id, callback) {
    var _this = this;
    this.findVenue(venue_id, function(requested_venue) {
        if (_this.bank_balance >= requested_venue.value) {
            if (!_this.findVenueInPurchased(venue_id)) {
                _this.bank_balance = _this.bank_balance - requested_venue.value;
                _this.purchased_venues.push(requested_venue);
                callback();
            }
        }
    });
};

User.prototype.sellVenue = function(venue_id, callback) {
	var newVenueList = [];
	var _this = this;
	var soldVenue = null;
	_this.purchased_venues.forEach(function(venue) {
		if (venue.venue.id !== venue_id) {
			newVenueList.push(venue);
		}else {
			_this.bank_balance = _this.bank_balance + venue.value;
			soldVenue = venue;
		}
	});
	_this.purchased_venues = newVenueList;
	Notification.sendNotification(_this.id, Notification.Types.MESSAGE, "Sold Venue", ["You sold "+ soldVenue.venue.name + " for $" + soldVenue.value.toString()], function() {
		callback();
	});
};

User.prototype.purchaseMultiplier = function(venue_id, mult_id) {
    // Force purchased venues to be resaved
    this.purchased_venues = this.purchased_venues.filter(function() {
        return true;
    });

    var venue = this.findVenueInPurchased(venue_id);
    var multipliers = venue.multipliers || [];
    if (multipliers.length < 2) {
        var target_mult = MultiplierTypes.findMultiplier(mult_id);
        if (this.bank_balance > target_mult.cost) {
            this.bank_balance = this.bank_balance - target_mult.cost;
            multipliers.push(target_mult);
            venue.multipliers = multipliers;
            this.purchased_venues = this.purchased_venues;
        }
    }
};

User.prototype.formatted_net_worth = function() {
    if (!this.net_worth) return "$0.00";

    return "$" + parseFloat(this.net_worth).toString();
};

User.prototype.findVenue = function(venue_id, callback) {
    VenueList.getOrCreateVenueListForUser(this.id, function(venueList) {
        var length = venueList.data.length;
        for (var i = 0; i < length; i++) {
            var venue = venueList.data[i];
            if (venueList.data[i].venue.id == venue_id) {
                callback(venueList.data[i]);
                return;
            }
        }
        console.log("Error trying to find ", venue_id);
        callback(null);
    });
};

User.prototype.findVenueInPurchased = function(venue_id) {
    var length = this.purchased_venues.length;
    for (var i = 0; i < length; i++) {
        var venue = this.purchased_venues[i];
        if (this.purchased_venues[i].venue.id == venue_id) return this.purchased_venues[i];
    }
    return null;
};

User.prototype.setCheckAmount = function(callback) {
    var targetTime = Date.now();
	var _this = this;
	var paystub = [];


    if (_this.next_check_issue_date) {
        if (targetTime > _this.next_check_issue_date) {
            _this.check_amount = _this.salary;
	        if ( _this.salary > 0) {
	            paystub.push(["New User Bonus","(daily)", _this.salary]);
		        _this.salary = _this.salary - 50;
	        }
	        Venue.calculateVenuesProfits(_this, _this.purchased_venues, function(profits, returnedPaystub) {
		        _this.check_amount += profits;
				paystub = paystub.concat(returnedPaystub);
		        _this.pay_stub = paystub;
	            callback();
	        });
        }else {
	        callback();
        }
    }
    else {
        _this.check_amount = _this.salary;
	    Notification.sendNotification(_this.id, Notification.TYPES.MESSAGE, "Welcome to Fourmillionaire!", "Be sure to check you Notifications for important messages and free prizes!", function() {
		    callback();
	    });
    }
};

User.prototype.fullName = function() {
    return this.first_name + " " + this.last_name;
};

User.prototype.getNetWorth = function() {
    var length = this.purchased_venues.length;
    var newWorth = this.bank_balance;

    for (var i = 0; i < length; i++) {
        var venue = this.purchased_venues[i];
        newWorth += venue.value;
    }

    return newWorth;
};

User.login = function(accessToken, callback) {
    Foursquare.Users.getUser('self', accessToken, function(err_foursquare, foursquare_user) {
        if (err_foursquare) {
            LocalUtils.throwError(err_foursquare);
            return;
        }
        else {
            foursquare_user = foursquare_user.user;
            var foursquare_id = foursquare_user.id;

            User.executeOnUserFoursquareId(foursquare_id, function(user) {
                console.log("Found user");
                var newUser = user ? user : new User();
                newUser.foursquare_id = foursquare_user.id;
                newUser.first_name = foursquare_user.firstName;
                newUser.last_name = foursquare_user.lastName;
                newUser.photo_url = foursquare_user.photo;
                newUser.access_token = accessToken;
                newUser.save(function(saveError) {
                    if (saveError) {
                        LocalUtils.throwError(saveError);
                    }
                    FriendList.setFriendsForUser(newUser, function(friendList) {
                        callback(newUser.id);
                    });
                    return;
                });
            });
        }
    });
};