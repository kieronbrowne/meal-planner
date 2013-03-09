define(
['views/week', 'views/recipe-list', 'collections/week', 'collections/meals', 'collections/recipes'],

function(WeekView, RecipeListView, WeekCollection, MealsCollection, RecipesCollection) {

	var App = function() {
		this.collections.week = new WeekCollection();
		this.collections.meals = new MealsCollection();
		this.collections.recipes = new RecipesCollection();
		
		this.collections.week.mealsCollection = this.collections.meals;
		
		this.views.week = new WeekView({collection: this.collections.week});
		this.views.recipeList = new RecipeListView({collection: this.collections.recipes});
		
		this.collections.week.resetPosition(new Date());
		$('#calApp').html(this.views.week.el);
		
		this.collections.meals.fetch({
			data: {start: this.collections.week.getFromDate(), end: this.collections.week.getToDate()}
		});
		
		this.collections.recipes.fetch();
		$('#recipeApp').html(this.views.recipeList.el);
	};
	
	App.prototype = {
		collections: {},
		views: {}
	};
	
	return App;
});
