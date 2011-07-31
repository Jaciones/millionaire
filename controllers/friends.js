var LocalUtils = require('../helpers/utils');

app.get('/friends', function(req, res) {
   var user_id = LocalUtils.getCookie('user_id', req);

   User.executeOnUser(user_id, function(user) {
      FriendList.updateFriendsForUserAsNecessary(user, function(friendList) {
         friendList.getFriendsAsUsers(function(results) {
            var photos = results.photos;
            var users = results.users;
            
            res.render('friends', {
               friends: users,
               profile_photos: photos,
               user: user
            });
         });
      });
   });
});