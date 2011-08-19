var LocalUtils = require('../helpers/utils');

Notification.findLatest = function(user_id, limit,  callback) {
    Notification.find({
        'user_id': user_id
    }).sort('created_at','descending').limit(limit).execFind(function(err, notifications) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        callback(notifications);
    });
};

Notification.sendNotification = function(user_id, type, description, data, callback) {
    var notification = new Notification();
    notification.type = type;
    notification.user_id = user_id;

    if (type == Notification.Types.MESSAGE) {
        notification.description = description;
    }

	notification.data = data;
    notification.save(function(err) {
        callback(notification);
    });
};

Notification.Types = {
    MESSAGE: "message",
    PRIZE : "prize"
};

Notification.executeOnNotification = function(notification_id, callback) {
    Notification.findOne({
        _id: notification_id
    }, function(err, notification) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        callback(notification);
    });
};