
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

