define(
['models/day'],

function(dayModel) {

	var Day = Backbone.Collection.extend({
	
		model: dayModel,
		
		startOfWeek: 6, // Saturday
		
		resetPosition: function(today) {
			var dayOfWeek = today.getDay();
			var adjDays = (7 + dayOfWeek - this.startOfWeek) % 7;
			today = this.makeDate(today.getFullYear(), today.getMonth(), today.getDate() - adjDays);
			var models = [];
			
			for (i = 0; i < 7; i++) {
				var day = new this.model(today);
				models.push(day);
				today = this.makeDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1);
			}
			this.reset(models);
		},
		
		makeDate: function(year, month, day) {
			var dt = new Date();
			dt.setUTCDate(day);
			dt.setUTCMonth(month);
			dt.setUTCFullYear(year);
			dt.setUTCHours(0);
			dt.setUTCMinutes(0);
			dt.setUTCSeconds(0);
			return dt;
		}
		
	});
	
	return Day;
});
