var LocalUtils = require('../helpers/utils');

app.get('/facebook/:venue_id', function(req, res) {
	var user_id = LocalUtils.getCookie('user_id', req);
	var venue_id = req.params.venue_id;
	var post_id = req.param('post_id');
	var location = LocalUtils.isMobile(req) ? "/portfolio":"/index_b?loc=portfolio";

	if (!post_id) {
		res.redirect(location);
		return;
	}

	User.executeOnUser(user_id, function(user) {
		user.purchaseMultiplier(venue_id, "facebook_shop");
		user.save(function(err) {
		    if (err) {
		        LocalUtils.throwError(err);
		        return;
		    }
			res.redirect(location);
		});
	});
});

