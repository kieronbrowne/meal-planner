define(
['views/week', 'collections/week'],

function(WeekView, WeekCollection) {

	var App = function() {
		var weekColl = new WeekCollection();
		var weekView = new WeekView({collection: weekColl});
		weekColl.resetPosition(new Date());
		$('#app').html(weekView.el);
	};
	
	App.prototype = {
		views: {}
	};
	
	return App;
});
