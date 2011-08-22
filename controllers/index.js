var LocalUtils = require('../helpers/utils');

app.get('/', function(req, res) {
	var location = req.param('loc')

    if (LocalUtils.isMobile(req) || location === "index") {
        res.redirect("/index");
    }else {
		location = location ? "?loc="+location : "";
        res.redirect("/index_b"+location);
    }
});

app.get('/index', function(req, res) {
    if (LocalUtils.getCookie('user_id', req)) {
        redirectHome(LocalUtils.getCookie('user_id', req), res);
        return;
    }

    res.render('index', {
        layout: false,
        user_id: LocalUtils.getCookie('user_id', req)
    });
});

app.get('/index_b', function(req, res) {
	var location = req.param('loc') || "index?loc=index";
    res.render('index_b', {
        layout: false,
	    loc : location
    });
});

app.get('/login', function(req, res) {
    res.writeHead(303, {
        "location": Foursquare.getAuthClientRedirectUrl()
    });
    res.end();
});

app.get('/callback', function(req, res) {
    console.log("Callback");
    Foursquare.getAccessToken({
        code: req.query.code
    }, function(error, accessToken) {
        if (error) {
            res.send("An error was thrown: " + error.message);
        }
        else {
            User.login(accessToken, function(user_id) {
                console.log("Login");
                redirectHome(user_id, res);
            });
        }
    });
});


function redirectHome(user_id, res) {
    res.cookie('user_id', user_id, {
        httpOnly: false
    });
    res.writeHead(303, {
        "location": "/home"
    });
    res.end();
}