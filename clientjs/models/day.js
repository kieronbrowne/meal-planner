define(
[],

function() {
	var Day = Backbone.Model.extend({
	
		shortDateFormat: 'D d M',
		longDateFormat: 'DD d MM yy',
	
		getShortDate: function() {
			return this.formatDate(this.shortDateFormat);
		},
		
		getLongDate: function() {
			return this.formatDate(this.longDateFormat);
		},
		
		formatDate: function(format) {
			return $.datepicker.formatDate(format, this.get('date'));
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
