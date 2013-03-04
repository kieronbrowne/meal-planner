define(
['views/day', 'text!templates/week.html'],

function(DayView, weekTemplate) {
	var week = Backbone.View.extend({
		template: _.template(weekTemplate),
		
		oneWeek: 7 * 24 * 60 * 60 * 1000,
		
		events: {
			"click .back": "navBack",
			"click .forward": "navForward"
		},
	
		initialize: function() {
			this.listenTo(this.collection, 'change', this.render);
		},
		
		render: function() {
			var from = this.collection.first().getLongDate();
			var to = this.collection.last().getLongDate();
			this.$el.html(this.template({from: from, to: to}));
			var self = this;
			this.collection.forEach(function(day) {
				var dayView = new DayView({model: day});
				self.$(".week").append(dayView.render().el);
			});
			return this;
		}, 
		
		navBack: function() {
			var first = this.collection.first().get('date');
			var prev = new Date(first.getTime() - this.oneWeek);
			console.log(prev);
			this.collection.resetPosition(prev);
		},
		
		navForward: function() {
			var first = this.collection.first().get('date');
			var next = new Date(first.getTime() + this.oneWeek);
			this.collection.resetPosition(next);
		}
	});
	
	return week;
});
