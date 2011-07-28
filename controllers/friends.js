var LocalUtils = require('../helpers/utils');

app.get('/friends', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   User.executeOnUser(user_id, function(user) {
      FriendList.updateFriendsForUserAsNecessary(user, function(friendList) {
         console.log("friendsList", friendList);
         res.render('friends', {
            friends: friendList
         });
      });
   });
});