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
		// Venue ids are the Foursquare Ids
		Foursquare.Venues.getVenue(venues[i].id, access_token, function(err, data) {
			returned_count = returned_count -1;
			if (!err) {
				results.push(data);
			}else {
				console.log("Error In Venue.getVenuesInfoFromFoursquare: ", err);
			}

			if (returned_count === 0) {
				callback(results);
			}
		});
	};
};
