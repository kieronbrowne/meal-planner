define(
['text!templates/recipe-list.html', 'views/recipe-row'],

function(template, rowView) {
	var view = Backbone.View.extend({
		className: '',
		template: _.template(template),
		
		events: {
			
		},
		
		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
		},
		
		render: function() {
			this.$el.html(this.template());
			var rows = [];
			this.collection.forEach(function(recipe) {
				var row = new rowView({model: recipe});
				rows.push(row.render().el);
			});
			this.$('tbody').html(rows);
			return this;
		}
		
	});
	
	return view;
});
