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

Notification.sendNotification = function(user_id, type, data, callback) {
    var notification = new Notification();
    notification.type = type;
    notification.user_id = user_id;
    
    if (type == Notification.Types.MESSAGE) {
        notification.description = data;
    }else if (type == Notification.Types.PRIZE) {
        notification.data = data;
    }
    
    notification.save(function(err) {
        callback(notification);
    });    
};

Notification.Types = { 
    MESSAGE: "message",
    PRIZE : "prize"
};
