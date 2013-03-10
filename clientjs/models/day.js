define(
[],

function() {
	var Day = Backbone.Model.extend({
	
		getShortDate: function() {
			return this.get('date').toLocaleFormat('%a %d %b');
		},
		
		getLongDate: function() {
			return this.get('date').toLocaleFormat('%A %d %B %Y');
		},
		
		initialize: function(date) {
			this.set({date: date});
		},
		
		getMeals: function() {
			return this.mealsCollection.where({date: this.get('date').getTime()});
		}
		
	});
	
	return Day;
});
