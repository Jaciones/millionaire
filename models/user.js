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

User.prototype.formatted_net_worth = function() {
   if (!this.net_worth)
      return "$ 0.00";
   
   return "$ " + parseFloat(this.net_worth).toString();
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

User.prototype.setCheckAmount = function() {
   var targetTime = Date.now();

   if (this.next_check_issue_date) {
      if (targetTime > this.next_check_issue_date) {
         this.check_amount = this.salary;
         this.check_amount += this.calculateVenueProfits();
      }
   }
   else {
      this.check_amount = this.salary;
   }
};

User.prototype.getNetWorth = function () {
   var length = this.purchased_venues.length;
   var newWorth = this.bank_balance;

   for (var i = 0; i < length; i++) {
      var venue = this.purchased_venues[i];
      newWorth += venue.value;
   }
   
   return newWorth; 
};

User.prototype.calculateVenueProfits = function() {
   var length = this.purchased_venues.length;
   var profits = 0;

   for (var i = 0; i < length; i++) {
      var venue = this.purchased_venues[i];
      profits += Venue.profitValue(venue);
   }
   return profits;
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
         console.log("Foursquare User", foursquare_user);
         User.executeOnUser(foursquare_id, function(user) {
            console.log("Found user");
            var newUser = user ? user:new User();
            newUser.foursquare_id = foursquare_user.id;
            newUser.first_name = foursquare_user.firstName;
            newUser.last_name = foursquare_user.lastName;
            newUser.access_token = accessToken;
            newUser.save(function(saveError) {
               if (saveError) {
                  LocalUtils.throwError(saveError);
               }
               FriendList.setFriendsForUser(newUser, function(friendList) {
                  callback(foursquare_id);
               });
               return;
            });
         });
      }
   });
};