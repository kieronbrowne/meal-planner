define(
['models/day'],

function(dayModel) {

	var Day = Backbone.Collection.extend({
	
		model: dayModel,
		
		startOfWeek: 6, // Saturday
		oneDay: 24 * 60 * 60 * 1000, // in milliseconds
		
		resetPosition: function(today) {
			var dayOfWeek = today.getDay();
			var adjDays = (7 + dayOfWeek - this.startOfWeek) % 7;
			today = this.makeDate(today.getFullYear(), today.getMonth(), today.getDate());
			today = new Date(today.getTime() - this.oneDay * adjDays);
			var models = [];
			
			for (i = 0; i < 7; i++) {
				var day = new this.model(today);
				models.push(day);
				today = new Date(today.getTime() + this.oneDay);
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
