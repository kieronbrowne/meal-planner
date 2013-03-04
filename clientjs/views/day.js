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
			var dt = Date();
			this.$el.html(this.template({day: this.model.getShortDate(), meals: 'foo'}));
			return this;
		}, 
		
		handleDayHdrClick: function() {
			console.log("Clicked on: " + this.model.getLongDate());
		}
	});
	
	return view;
});
