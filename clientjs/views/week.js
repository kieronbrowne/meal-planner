define(
['views/day', 'text!templates/week.html'],

function(DayView, weekTemplate) {
	var week = Backbone.View.extend({
		template: _.template(weekTemplate),
		selectedDate: $.datepicker.formatDate('yy-mm-dd', new Date()),

		oneWeek: 7 * 24 * 60 * 60 * 1000, // in milliseconds
	
		events: {
			"click .back": "navBack",
			"click .forward": "navForward",
			"change .goToDay": "navTo"
		},
		
		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
			this.mealsCollection = this.collection.mealsCollection;
		},
	
		render: function() {
			var from = this.collection.first().getLongDate();
			var to = this.collection.last().getLongDate();
			this.$el.html(this.template({from: from, to: to, selectedDate: this.selectedDate}));
			this.$(".week").html('');
			this.collection.forEach(function(day) {
				var dayView = new DayView({model: day, mealsCollection: this.mealsCollection});
				this.$(".week").append(dayView.render().el);
			}, this);
			this.$('.goToDay').datepicker({showOn: 'button', buttonText: 'Go to...', showButtonPanel: true, 
			selectOtherMonths: true, showOtherMonths: true});
			return this;
		}, 
		
		nav: function(n) {
			var dt = this.collection.first().get('date');
			dt = new Date(dt.getTime() + n * this.oneWeek);
			this.navToDate(dt);
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
			this.navToDate(dt);
		},
		
		navToDate: function(dt) {
			this.collection.resetPosition(dt);
			this.mealsCollection.fetch({
				data: {start: this.collection.getFromDate(), end: this.collection.getToDate()}
			});
		}
	});
	
	return week;
});
