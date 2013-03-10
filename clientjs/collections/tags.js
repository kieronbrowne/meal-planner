define(
['models/tag'],

function(TagModel) {
	var Collection = Backbone.Collection.extend({
		model: TagModel,
		
		url: 'tag'
	});
	
	return Collection;
});
