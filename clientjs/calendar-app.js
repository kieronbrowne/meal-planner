define(
['views/week', 'collections/week', 'collections/meals'],

function(WeekView, WeekCollection, MealsCollection) {

	var App = function() {
		var weekColl = new WeekCollection();
		var mealsColl = new MealsCollection();
		weekColl.mealsCollection = mealsColl;
		
		var weekView = new WeekView({collection: weekColl, mealsCollection: mealsColl});
		
		weekColl.resetPosition(new Date());
		$('#app').html(weekView.el);
		
		mealsColl.fetch({
			data: {start: weekColl.getFromDate(), end: weekColl.getToDate()}
		});
	};
	
	App.prototype = {
		views: {}
	};
	
	return App;
});
