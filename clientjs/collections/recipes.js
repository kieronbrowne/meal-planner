define(
['models/recipe'],

function(RecipeModel) {
	var Collection = Backbone.Collection.extend({
		model: RecipeModel,
		
		url: 'recipe'
	});
	
	return Collection;
});
