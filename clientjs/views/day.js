define(
['text!templates/day.html', 'views/meal', 'views/meal-edit', 'models/meal'],

function(dayTemplate, MealView, MealEditView, MealModel) {
	var view = Backbone.View.extend({
	
		className: 'day',
		
		template: _.template(dayTemplate),
		
		events: {
			"click .addMeal": "handleDayHdrClick"
		},
		
		initialize: function() {
			this.listenTo(this.model.mealsCollection, 'reset', this.render);
			this.listenTo(this.model.mealsCollection, 'add', this.render);
			this.listenTo(this.model.mealsCollection, 'change', this.render);
			this.listenTo(this.model.mealsCollection, 'destroy', this.render);
		},
		
		render: function() {
			var dt = this.model.get('date');
			var today = new Date();
			this.$el.html(this.template({day: this.model.getShortDate()}));
			var self = this;
			this.$el.droppable({
				hoverClass: "mealDropHover",
				drop: function(event, ui) {
					self.dropMeal(ui.draggable.context, self.model.get('date'));
				}
			});
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
			var meal = new MealModel();
			meal.set('date', this.model.get('date').getTime());
			meal.collection = this.model.mealsCollection;
			var editView = new MealEditView({model: meal});
			editView.show();
		},
		
		dropMeal: function(meal, date) {
			mealModel = window.calApp.collections.meals.get(meal.id);
			mealModel.set({date: date.getTime()}, {silent: true});
			mealModel.trigger('change');
			mealModel.save();
		}
	});
	
	return view;
});
