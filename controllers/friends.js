var LocalUtils = require('../helpers/utils');

app.get('/friends', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);
   User.executeOnUser(user_id, function(user) {
      FriendList.updateFriendsForUserAsNecessary(user, function(friendList) {
	      console.log("got friends list", friendList);

         friendList.getFriendsAsUsers(function(results) {
	         console.log("getFriendsAsUsers", results);
            var users = results.users;
            res.render('friends', {
               friends: users,
               user: user
            });
         });
      });
   });
});
