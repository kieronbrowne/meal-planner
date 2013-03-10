define(
[],

function() {
	var Model = Backbone.Model.extend({
		idAttribute: '_id',
		
		parse: function(json) {
			json.date = new Date(json.date).getTime();
			return json;
		}
	});
	
	return Model;
});
