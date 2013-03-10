define(
['text!templates/tags.html', 'views/tag'],

function(template, TagView) {
	var view = Backbone.View.extend({
		template: _.template(template),
		
		events: {
			
		},
		
		initialize: function() {
			this.listenTo(this.collection, 'reset', this.render);
		},
		
		render: function() {
			this.$el.html(this.template());
			var el = this.$('.tags');
			this.collection.forEach(function(tag) {
				var tagView = new TagView({model: tag});
				el.append(tagView.render().el);
			});
			return this;
		}
		
	});
	
	return view;
});
