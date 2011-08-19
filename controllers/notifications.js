var LocalUtils = require('../helpers/utils');

app.get('/notifications', function(req, res) {
	var user_id = LocalUtils.getCookie('user_id', req);
	Notification.findLatest(user_id, 20, function(notifications) {
		res.render('notifications', {
		    layout: "layout_simple",
			"notifications" : notifications,
			javascripts : ["/javascripts/notifications.js?" + appId, "/javascripts/home.js?234223" + appId]
		});
	});
});


app.get('/n_read/:notification_id', function(req, res) {
	var notification_id = req.params.notification_id;
	Notification.executeOnNotification(notification_id, function(notification) {
		notification.is_read = true;
		notification.save(function(err) {
			if (err) {
			    LocalUtils.throwError(err);
			    return;
			}
			res.contentType('json');
			res.json({ notificationId: notification.id });
		});

	});
});

app.get('/has_notifications.json', function(req, res) {
	var user_id = LocalUtils.getCookie('user_id', req);
	Notification.findLatest(user_id, 10, function(notifications) {
		var hasNotifications = false;

		notifications.forEach(function(notif) {
			if (!notif.is_read)	{
				hasNotifications = true;
			}
		});

		res.contentType('json');
		res.json({ has_notifications: hasNotifications });
	});
});
