define(
[],

function() {
	var view = Backbone.View.extend({
		tagName: 'li',
		className: 'meal',
		
		events: {
			"click": "handleMealClick"
		},
		
		render: function() {
			this.$el.html(this.model.get('name'));
			return this;
		},
		
		handleMealClick: function() {
			console.log('Clicked on ' + this.model.get('name') + ' (' + this.model.url() + ")");
		}
	});
	
	return view;
});
