define(
['views/day', 'text!templates/week.html'],

function(DayView, weekTemplate) {
	var week = Backbone.View.extend({
		template: _.template(weekTemplate),
		
		events: {
			"click .back": "navBack",
			"click .forward": "navForward"
		},
		
		initialize: function() {
			this.listenTo(this.collection, 'moved', this.render);
		},
	
		render: function() {
			var from = this.collection.first().getLongDate();
			var to = this.collection.last().getLongDate();
			this.$el.html(this.template({from: from, to: to}));
			this.$(".week").html('');
			var self = this;
			this.collection.forEach(function(day) {
				var dayView = new DayView({model: day});
				self.$(".week").append(dayView.render().el);
			});
			return this;
		}, 
		
		navBack: function() {
			this.collection.shiftWeek(-1);
		},
		
		navForward: function() {
			this.collection.shiftWeek(1);
		}
	});
	
	return week;
});
