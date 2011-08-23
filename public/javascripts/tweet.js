
$("#layout_page").live("pageshow", function(event) {
	setTimeout(function() {
		var venue_id = $("input#venue_id").val();
		twttr.events.bind('tweet', function(event) {
			$.mobile.pageLoading();
			$.ajax({
				url: "/venue/tweeted",
				type: 'post',
				data: {'venue_id': venue_id },
				cache: false,
				dataType: 'json',
				success: function(data){
					$.mobile.pageLoading(true);
					window.location = "/portfolio";
				}
			});
		});
	}, 1000);
});