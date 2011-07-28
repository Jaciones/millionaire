User.executeOnUser = function(user_id, func) {
   User.findOne({
      'foursquare_id': user_id
   }, function(err, user) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      func(user);
   });
};

User.prototype.purchaseVenue = function(venue_id) {
   var requested_venue = this.findVenue(venue_id);
   if (this.bank_balance > requested_venue.value) {
      if (!this.findVenueInPurchased(venue_id)) {
         this.bank_balance = this.bank_balance - requested_venue.value;
         this.purchased_venues.push(requested_venue);
      }
   }
};

User.prototype.findVenue = function(venue_id) {
   var length = this.venues.length;
   for (var i = 0; i < length; i++) {
      var venue = this.venues[i];
      if (this.venues[i].venue.id == venue_id) return this.venues[i];
   }
   return null;
};

User.prototype.findVenueInPurchased = function(venue_id) {
   var length = this.purchased_venues.length;
   for (var i = 0; i < length; i++) {
      var venue = this.purchased_venues[i];
      if (this.purchased_venues[i].venue.id == venue_id) return this.purchased_venues[i];
   }
   return null;
};