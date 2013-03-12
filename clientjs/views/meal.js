define(
['views/meal-edit', 'text!templates/meal.html'],

function(MealEditView, template) {
	var view = Backbone.View.extend({
		tagName: 'li',
		className: 'meal',
		template: _.template(template),
		id: function() {return this.model.id;},
		
		events: {
			"dblclick": "handleMealClick",
			"click .remove": "removeMeal"
		},
		
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			this.$el.draggable();
			return this;
		},
		
		handleMealClick: function() {
			var mealEditView = new MealEditView({model: this.model});
			mealEditView.show();
		},
		
		removeMeal: function() {
			if (confirm('Really delete?')) {
				this.model.destroy();
			} 
			return false;
		}
		
	});
	
	return view;
});
