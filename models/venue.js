Venue.getAllAvailableForUser = function(access_token, callback) {
   Foursquare.Users.getVenueHistory('self', null, access_token, function(err, data) {
      if (err) {
         callback(err, null);
      }
      var venues = data.venues.items;
      for (var i = 0; i < venues.length; i++) {
         Venue.assignValue(venues[i]);
      }
      callback(err, venues.sort(Venue.sortByUserVisits));
   });
};

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

Venue.profitValue = function(venue) {
   return venue.value / 10;
};