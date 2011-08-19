var LocalUtils = require('../helpers/utils');

app.get('/friends/:type?', function(req, res) {
	var user_id = LocalUtils.getCookie('user_id', req);
	var displayOnly = (req.params.type=='display');
   User.executeOnUser(user_id, function(user) {
      FriendList.updateFriendsForUserAsNecessary(user, function(friendList) {

         friendList.getFriendsAsUsers(function(results) {
            var users = results.users;

	        var template = displayOnly ? 'friends_display' : 'friends';
            res.render(template, {
               friends: users,
               user: user
            });
         });
      });
   });
});
