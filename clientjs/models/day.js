define(
[],

function() {
	var Day = Backbone.Model.extend({
	
		oneWeek: 7 * 24 * 60 * 60 * 1000,
	
		getShortDate: function() {
			return this.get('date').toLocaleFormat('%a %d %b');
		},
		
		getLongDate: function() {
			return this.get('date').toLocaleFormat('%A %d %B %Y');
		},
		
		initialize: function(date) {
			this.set({date: date});
		},
		
		shiftWeek: function(n) {
			var dt = this.get('date');
			dt = new Date(dt.getTime() + n * this.oneWeek);
			this.set({date: dt});
		}
	});
	
	return Day;
});
