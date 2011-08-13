var LocalUtils = require('../helpers/utils');

app.post('/bank/cash_check', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);
    User.executeOnUser(user_id, function(user) {
        cashCheck(user, function() {
            res.redirect("/home?cashed=true");
        });
    });
});

app.get('/bank', function(req, res) {
    var user_id = LocalUtils.getCookie('user_id', req);

    User.executeOnUser(user_id, function(user) {
        setCheckAmount(user, function() {
            var data = {};
            if (user.check_amount==0) {
                data.net_worth = user.formatted_net_worth();
                console.log("foo", Rank.getRankValue(user.net_worth));
                data.rank = Rank.getRankValue(user.net_worth);
            }
	        console.log(user);
            res.render('bank', {
                user: user,
                data: data
            });
        });
    });
});

function cashCheck(user, callback) {
    if (user.check_amount > 0) {
        user.bank_balance = user.bank_balance + user.check_amount;
        user.check_amount = 0;
        user.next_check_issue_date = Date.now().addMinutes(2);
    }
    user.save(function(err) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        callback();
    });
}

function setCheckAmount(user, callback) {
    user.setCheckAmount(function() {
        user.save(function(err) {
            if (err) {
                LocalUtils.throwError(err);
                return;
            }
            callback();
        });
    });
}