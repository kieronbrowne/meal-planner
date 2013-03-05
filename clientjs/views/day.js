define(
['text!templates/day.html'],

function(dayTemplate) {
	var view = Backbone.View.extend({
	
		className: 'day',
		
		template: _.template(dayTemplate),
		
		events: {
			"click .dayHeader": "handleDayHdrClick"
		},
		
		render: function() {
			var dt = this.model.get('date');
			var today = new Date();
			this.$el.html(this.template({day: this.model.getShortDate(), meals: 'foo'}));
			if (dt.getUTCDate() == today.getDate() && dt.getUTCMonth() == today.getMonth() && dt.getUTCFullYear() == today.getFullYear()) {
				this.$el.addClass('today');
			}
			return this;
		}, 
		
		handleDayHdrClick: function() {
			console.log("Clicked on: " + this.model.getLongDate());
		}
	});
	
	return view;
});
