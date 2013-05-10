define(
    ['text!templates/recipe-list.html', 'views/recipe-row', 'views/tags',
     'models/recipe', 'views/recipe-edit'],

    function(template, rowView, tagsView, RecipeModel, recipeView) {
	var view = Backbone.View.extend({
	    className: '',
	    template: _.template(template),
	    
	    events: {
		"click .add-recipe": "addRecipe"
	    },
	    
	    initialize: function() {
		this.listenTo(this.collection, 'reset', this.render);
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.options.tagsCollection, 'change', this.tagSelected);
	    },
	    
	    render: function() {
		this.$el.html(this.template());
		var rows = [];
		this.collection.forEach(function(recipe) {
		    var row = new rowView({model: recipe});
		    rows.push(row.render().el);
		});
		this.$('tbody').html(rows);
		return this;
	    },
	    
	    tagSelected: function() {
		var tags = window.calApp.collections.tags.where({checked: true});
		tags = _.pluck(tags,'id').join(',');
		this.collection.fetch({
		    data: {tags: tags}
		});
	    },

	    addRecipe: function() {
		var recipe = new RecipeModel({tags: ""});
		recipe.collection = this.collection;
		var editRecipe = new recipeView({model: recipe, collection: this.collection});
		editRecipe.show();
		return false;
	    }
	    
	});
	
	return view;
    });
