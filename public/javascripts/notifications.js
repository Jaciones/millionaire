
$(".notif").live("pageshow", function(event) {
	var id = $(this).attr("id");

	$.ajax({
	  url: "/n_read/" + id,
	  cache: false,
	  success: function(data){
		var notificationId = data.notificationId;
		if (notificationId) {
			$("#a_" + notificationId + " .notice").hide();
		}
	  }
	});
});