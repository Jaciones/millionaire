/**
 * Created by IntelliJ IDEA.
 * User: developer
 * Date: 8/21/11
 * Time: 5:31 PM
 * To change this template use File | Settings | File Templates.
 */


$("#layout_page").live("pageshow", function(event) {
	twttr.events.bind('tweet', function(event) {
		alert("tweeted");
	});
});