define(
['text!templates/recipe-list.html', 'views/recipe-row'],

function(template, rowView, tagsView) {
	var view = Backbone.View.extend({
		className: '',
		template: _.template(template),
		
		events: {
			
		},
		
		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
			this.listenTo(this.options.tagsCollection, 'change', this.tagSelected);
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
		},
		
		tagSelected: function() {
			var tags = window.calApp.collections.tags.where({checked: true});
			tags = _.pluck(tags,'id').join(',');
			this.collection.fetch({
				data: {tags: tags}
			});
		}
		
	});
	
	return view;
});
