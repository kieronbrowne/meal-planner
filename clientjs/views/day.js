define(
['text!templates/day.html', 'views/meal'],

function(dayTemplate, MealView) {
	var view = Backbone.View.extend({
	
		className: 'day',
		
		template: _.template(dayTemplate),
		
		events: {
			"click .dayHeader": "handleDayHdrClick"
		},
		
		initialize: function() {
			this.listenTo(this.model.mealsCollection, 'reset', this.render);
		},
		
		render: function() {
			var dt = this.model.get('date');
			var today = new Date();
			this.$el.html(this.template({day: this.model.getShortDate()}));
			if (dt.getUTCDate()         == today.getDate() &&
					dt.getUTCMonth()    == today.getMonth() &&
					dt.getUTCFullYear() == today.getFullYear()) {
				this.$el.addClass('today');
			}
			var listEl = this.$('.meals');
			listEl.html('');
			this.model.getMeals().forEach(function(meal) {
				var mealView = new MealView({model: meal});
				listEl.append(mealView.render().el);
			});
			return this;
		}, 
		
		handleDayHdrClick: function() {
			console.log("Clicked on: " + this.model.getLongDate());
		}
	});
	
	return view;
});
