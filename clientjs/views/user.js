define(
    ['text!templates/user.html'],
    function(userTemplate) {
	var view = Backbone.View.extend({
	    
	    template: _.template(userTemplate),

	    tagName: 'li',

	    className: 'dropdown pull-right',

	    initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	    },

	    render: function() {
		console.log(this.model.attributes);
		console.log({a: 1, b: 'foo bar'});
		this.$el.html(this.template(this.model.attributes));
		return this;
	    },
	});

	return view;
    });