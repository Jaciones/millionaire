var LocalUtils = require('../helpers/utils');

Venue.sortByUserVisits = function(a, b) {
   return (b.beenHere - a.beenHere);
};

Venue.assignValue = function(venue) {
   if (venue.venue.stats) {
      var visitIndex = Math.floor(venue.venue.stats.checkinsCount / 100);
      if (visitIndex === 0) {
         visitIndex = 1;
      }
      venue.value = visitIndex * 200;
   }
};

Venue.rent = function(venue) {
   return venue.value / 10;
};

Venue.getVenuesInfoFromFoursquare = function(venues, access_token, callback) {
	var returned_count = venues.length;
	var results = [];
	for(var i=0; i< venues.length; i++) {
		var venue = venues[i].venue;
		// Venue ids are the Foursquare Ids
		Foursquare.Venues.getVenue(venue.id, access_token, function(err, data) {
			if (!err) {
				results.push(data);
			}else {
				console.log("Error In Venue.getVenuesInfoFromFoursquare: ", err);
			}
			returned_count = returned_count -1;
			console.log("returned_count", returned_count.toString());
			if (returned_count == 0) {
				setTimeout(function() {
					callback(results);
				}, 1);
			}
		});
	};
};

Venue.calculateVenuesProfits = function(user, purchased_venues, callback) {
	var length = purchased_venues.length;
	var profits = 0;
	var payStub = [];
	var venueMap = {};
	var _this = this;

	for (var i = 0; i < length; i++) {
	    var venue = purchased_venues[i];
		venueMap[venue.venue.id] = venue.venue;
		var venueProfit = Venue.rent(venue);
	    profits += venueProfit;
		payStub.push(["Rent", venue.venue.name, venueProfit]);
	    var multLength = venue.multipliers ? venue.multipliers.length : 0;
	    for (var j = 0; j < multLength; j++) {
		    var multiplier = MultiplierTypes.findMultiplier(venue.multipliers[j].id);
		    var val = multiplier.func(venue, user);
		    payStub.push(["Addition", multiplier.name, val]);
	        profits += val;
	    }
	}
	console.warn("venueMap",venueMap);
	// Call to get new stats from Foursquare
	Venue.getVenuesInfoFromFoursquare(purchased_venues, user.access_token, function(data) {
		data.forEach(function(venue) {
			var newVenueStats = venue.venue.stats;
			var oldVenueStats = venueMap[venue.venue.id].stats;

			var checkins = newVenueStats.checkinsCount - oldVenueStats.checkinsCount;
			payStub.push(["New Checkins ($10 x " + checkins.toString() + ")", venue.venue.name, 10*checkins]);
			profits += 10*checkins;
		});

		callback(profits, payStub);
	});

};
