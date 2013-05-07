define(
    [],

    function() {
	var Model = Backbone.Model.extend({
	    idAttribute: '_id',

	    parse: function(response, options) {
		response.tags = _.pluck(response.tags, 'name').join(', ');
		return response;
	    }
	});
	
	return Model;
    });
