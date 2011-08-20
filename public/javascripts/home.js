$("#layout_page").live("pageshow", function(event) {
	$.mobile.pageLoading(true);
    for(var i=0; i< 21; i++) {
        $(".notice").fadeToggle("slow", "linear");
    }

	$.ajax({
	  url: "/has_notifications.json",
	  cache: false,
	  success: function(data){
		var hasNotifications = data.has_notifications;
		if (hasNotifications) {
			$("#notifications").prepend("<span class='notice yellow'>&nbsp;&#9733;&nbsp;</span>");
			for(var i=0; i< 21; i++) {
				$("#notifications .notice").fadeToggle("slow", "linear");
			}
		}
	  }
	});

});


