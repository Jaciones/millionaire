Notification.findLatest = function(user_id, callback) {
    Notification.find({
        'user_id': user_id
    }).limit(10).execFind(function(err, notifications) {
        if (err) {
            LocalUtils.throwError(err);
            return;
        }
        callback(notifications);
    });
};