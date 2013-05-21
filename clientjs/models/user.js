define(
    [],
    function() {
	var User = Backbone.Model.extend({
	    urlRoot: 'user'
	});

	return User;
    });