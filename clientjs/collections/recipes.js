define(
    ['models/recipe'],

    function(RecipeModel) {
	var Collection = Backbone.Collection.extend({
	    model: RecipeModel,
	    
	    url: 'recipe',

	    comparator: function(a, b) {
		return a.attributes.name.localeCompare(b.attributes.name);
	    }
	});
	
	return Collection;
    });
