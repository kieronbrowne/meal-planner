define(
    [],

    function() {
	var Model = Backbone.Model.extend({
	    idAttribute: '_id',

	    parse: function(response, options) {
		response.tagStr = _.pluck(response.tags, 'name').join(', ');
		return response;
	    }
	});
	
	return Model;
    });
