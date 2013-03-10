define(
['text!templates/recipe-row.html'],

function(template) {
	var view = Backbone.View.extend({
		tagName: 'tr',
		className: 'recipe',
		template: _.template(template),
		
		events: {
			
		},
		
		render: function() {
			this.$el.html(this.template(this.model.attributes));
			return this;
		}
		
	});
	
	return view;
});
