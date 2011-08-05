var LocalUtils = require('../helpers/utils');

FriendList.executeOnFriendList = function(user_id, callback) {
   FriendList.findOne({
      'user_id': user_id
   }, function(err, friendList) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback(friendList);
   });
};

FriendList.updateFriendsForUserAsNecessary = function(user, callback) {
   FriendList.executeOnFriendList(user.foursquare_id, function(friendList) {
      if (friendList) {
         // Found friend list, update it if date has expired
         if (friendList.next_update_date > new Date() || true) {
            FriendList.setFriendsForUser(user, function(friendList) {
               callback(friendList);
            });
         }
      }
      else {
         // No friends list yet, hopefully this never happens
         FriendList.setFriendsForUser(user, function(friendList) {
            callback(friendList);
         });
      }
   });
};

/* Used to create users from friends, no callback, fire and forget */
FriendList.updateUserAsNecessary = function(friend) {
   User.executeOnUser(friend.id, function(user) {
      if (!user) {
         var newUser = new User();
         newUser.foursquare_id = friend.id;
         newUser.first_name = friend.firstName;
         newUser.last_name = friend.lastName;
         newUser.save(function(saveError) {
            if (saveError) {
               LocalUtils.throwError(saveError);
            }
         });
      }else {
         user.net_worth = user.getNetWorth();
         user.save(function(error) {
            if (error) {
               LocalUtils.throwError(error);
            }            
         });
      }
   });
};

FriendList.prototype.getFriendsAsUsers = function(callback) {
   var friendIds = [];
   var photos = {};
   
   this.friends.forEach(function(friend){
      friendIds.push(friend.id);
      photos[friend.id] = friend.photo;
   });
   
   User.find({ foursquare_id : { $in : friendIds}}, function(err, results) {
      if (err) {
         LocalUtils.throwError(err);
         return;
      }
      callback({ 'photos':photos, users: results});
   });
};

FriendList.setFriendsForUser = function(user, callback) {
   var callbackData = null;
   Foursquare.Users.getFriends('self', {}, user.access_token, function(err_foursquare, friends) {
      if (err_foursquare) {
         LocalUtils.throwError(err_foursquare);
         return;
      }
      else {
         FriendList.executeOnFriendList(user.foursquare_id, function(friendList) {
            if (!friendList) {
               var newFriendList = new FriendList();
               newFriendList.user_id = user.foursquare_id;
               friendList = newFriendList;
            }
            friendList.friends = friends.friends.items;
            friendList.friends.forEach(function(friend) {
               FriendList.updateUserAsNecessary(friend);
            });
            friendList.next_update_date = new Date().addDays(1);
            friendList.save(function(saveError) {
               if (saveError) {
                  LocalUtils.throwError(saveError);
               }
               if (callback) {
                  callback(friendList);
               }
            });
         });
      }

   });
};