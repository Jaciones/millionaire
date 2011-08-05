var LocalUtils = require('../helpers/utils');
app.get('/portfolio', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    User.executeOnUser(user_id, function(user) {
        res.render('portfolio', {
            user: user,
            venues: user.purchased_venues
        });
    });
});

app.get('/portfolio_friends/:friend_id', function(req, res) {
    var user_id = req.params.friend_id;
    User.executeOnUser(user_id, function(user) {
        res.render('portfolio', {
            user: user,
            venues: user.purchased_venues
        });
    });
});