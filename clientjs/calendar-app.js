define(
[
'views/week', 'views/recipe-list', 'views/tags',
'collections/week', 'collections/meals', 'collections/recipes', 'collections/tags'
],

function(WeekView, RecipeListView, TagsView, WeekCollection, MealsCollection, RecipesCollection, TagsCollection) {

	var App = function() {
		this.collections.week = new WeekCollection();
		this.collections.meals = new MealsCollection();
		this.collections.recipes = new RecipesCollection();
		this.collections.tags = new TagsCollection();
		
		this.collections.week.mealsCollection = this.collections.meals;
		
		this.views.week = new WeekView({collection: this.collections.week});
		this.views.recipeList = new RecipeListView({collection: this.collections.recipes, tagsCollection: this.collections.tags});
		this.views.tags = new TagsView({collection: this.collections.tags});
		
		this.collections.week.resetPosition(new Date());
		$('#calApp').html(this.views.week.el);
		
		this.collections.meals.fetch({
			data: {start: this.collections.week.getFromDate(), end: this.collections.week.getToDate()}
		});
		
		this.collections.tags.fetch();
		$('#tagsApp').html(this.views.tags.el);
		
		this.collections.recipes.fetch();
		$('#recipeApp').html(this.views.recipeList.el);
	};
	
	App.prototype = {
		collections: {},
		views: {}
	};
	
	return App;
});
