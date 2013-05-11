define(
    ['text!templates/recipe-row.html', 'views/recipe-edit'],

    function(template, RecipeEditView) {
	var view = Backbone.View.extend({
	    tagName: 'tr',
	    className: 'recipe',
	    template: _.template(template),
	    
	    events: {
		"dblclick .recipe-name": "editRecipe",
		"click .recipe-del": "removeRecipe"
	    },

	    initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	    },
	    
	    render: function() {
		this.$el.html(this.template(this.model.attributes));
		this.$(".recipe").draggable({revert: true});
		return this;
	    },
	    
	    editRecipe: function() {
		var recipeEditView = new RecipeEditView({model: this.model});
		recipeEditView.show();
	    },

	    removeRecipe: function() {
		if (confirm("Really delete '" + this.model.attributes.name + "'?")) {
		    this.model.destroy({success: function() {
			window.calApp.collections.tags.fetch();
		    }});
		    this.remove();
		}
	    }
	    
	});
	
	return view;
    });
