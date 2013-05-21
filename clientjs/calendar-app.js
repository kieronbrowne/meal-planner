define(
    [
	'views/week', 'views/recipe-list', 'views/tags', 'views/user',
	'collections/week', 'collections/meals', 'collections/recipes', 'collections/tags',
	'models/user'
    ],

    function(WeekView, RecipeListView, TagsView, UserView, 
	     WeekCollection, MealsCollection, RecipesCollection, TagsCollection,
	     UserModel) {

	var App = function() {
	    this.models.user = new UserModel();

	    this.collections.week = new WeekCollection();
	    this.collections.meals = new MealsCollection();
	    this.collections.recipes = new RecipesCollection();
	    this.collections.tags = new TagsCollection();
	    
	    this.collections.week.mealsCollection = this.collections.meals;
	    
	    this.views.week = new WeekView({collection: this.collections.week});
	    this.views.recipeList = new RecipeListView({collection: this.collections.recipes, tagsCollection: this.collections.tags});
	    this.views.tags = new TagsView({collection: this.collections.tags});
	    this.views.user = new UserView({model: this.models.user});
	    
	    this.collections.week.resetPosition(new Date());
	    $('#calApp').html(this.views.week.el);
	    
	    this.collections.meals.fetch({
		data: {start: this.collections.week.getFromDate(), end: this.collections.week.getToDate()}
	    });
	    
	    this.collections.tags.fetch();
	    $('#tagsApp').html(this.views.tags.el);
	    
	    this.collections.recipes.fetch();
	    $('#recipeApp').html(this.views.recipeList.el);

	    this.models.user.fetch();
	    $('#user').html(this.views.user.el);
	};
	
	App.prototype = {
	    models: {},
	    collections: {},
	    views: {}
	};
	
	return App;
    });
