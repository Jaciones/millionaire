var LocalUtils = require('../helpers/utils');

app.get('/friends', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   User.executeOnUser(user_id, function(user) {
      FriendList.updateFriendsForUserAsNecessary(user, function(friendList) {
         console.log("friends", friendList.friends);
         for(var i=0; i< friendList.friends.length; i++) {
         console.log("friends_item", friendList.friends[i]);
            
         }
         res.render('friends', {
            friends: friendList.friends
         });
      });
   });
});