define(
['text!templates/tag.html'],

function(template) {
	var view = Backbone.View.extend({
		className: 'tag',
		template: _.template(template),
		checked: false,
		
		events: {
			"change input:checkbox": "handleCheckbox"
		},
		
		render: function() {
			var checked = this.checked ? 'checked="checked"' : '';
			this.$el.html(this.template(_.extend(this.model.attributes, {checked: checked})));
			return this;
		},
		
		handleCheckbox: function() {
			var val = this.$('input').is(':checked');
			this.model.set({checked: val});
		}
		
	});
	
	return view;
});
