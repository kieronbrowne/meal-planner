define(
['views/week', 'collections/week'],

function(WeekView, WeekCollection) {

	var App = function() {
		var weekColl = new WeekCollection();
		weekColl.resetPosition(new Date());
		var weekView = new WeekView({collection: weekColl});
		$('#app').html(weekView.render().el);
	};
	
	App.prototype = {
		views: {}
	};
	
	return App;
});
