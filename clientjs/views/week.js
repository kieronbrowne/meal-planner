define(
['views/day', 'text!templates/week.html'],

function(DayView, weekTemplate) {
	var week = Backbone.View.extend({
		template: _.template(weekTemplate),
		selectedDate: new Date().toLocaleFormat("%D"),

		oneWeek: 7 * 24 * 60 * 60 * 1000, // in milliseconds
	
		events: {
			"click .back": "navBack",
			"click .forward": "navForward",
			"change .goToDay": "navTo"
		},
		
		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
		},
	
		render: function() {
			var from = this.collection.first().getLongDate();
			var to = this.collection.last().getLongDate();
			this.$el.html(this.template({from: from, to: to, selectedDate: this.selectedDate}));
			this.$(".week").html('');
			var self = this;
			this.collection.forEach(function(day) {
				var dayView = new DayView({model: day});
				self.$(".week").append(dayView.render().el);
			});
			this.$('.goToDay').datepicker({showOn: 'button', buttonText: 'Go to...', showButtonPanel: true, 
			selectOtherMonths: true, showOtherMonths: true});
			return this;
		}, 
		
		nav: function(n) {
			var dt = this.collection.first().get('date');
			dt = new Date(dt.getTime() + n * this.oneWeek);
			this.collection.resetPosition(dt);
		},
		
		navForward: function() {
			this.nav(1);
		}, 
		
		navBack: function() {
			this.nav(-1);
		},
		
		navTo: function() {
			var dt = this.$('.goToDay').val();
			this.selectedDate = dt;
			dt = new Date(dt);
			this.collection.resetPosition(dt);
		}
	});
	
	return week;
});
