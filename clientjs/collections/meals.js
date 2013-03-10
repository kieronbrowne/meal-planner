define(
['models/meal'],

function(MealModel) {
	var Collection = Backbone.Collection.extend({
		model: MealModel,
		
		url: 'meal'
	});
	
	return Collection;
});
