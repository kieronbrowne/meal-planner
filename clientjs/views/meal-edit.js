define(
    ["text!templates/meal-edit.html"],

    function(mealEditTemplate) {
	var view = Backbone.View.extend({
	    
	    className: 'mealEdit modal',
	    
	    template: _.template(mealEditTemplate),
	    
	    events: {
		"submit": "handleSubmit"
	    },
	    
	    render: function() {
		this.model.set('action', this.model.isNew() ? 'Create' : 'Save');
		this.$el.html(this.template(this.model.attributes));
		return this;
	    },
	    
	    handleSubmit: function() {
		var mealName = this.$('[name=name]').val();
		var self = this;
		if (mealName !== "") {
		    this.model.set({name: mealName});
		    if (this.model.isNew()) {
			this.model.collection.add(this.model);
		    }
		    this.model.save({
			success: function() {
			    self.$('.close').click();
			}
		    });
		}
		this.trigger('saved');
		this.remove();
		return false;
	    },
	    
	    show: function() {
		this.render();
		$('#modalPlaceholder').html(this.el);
		this.$el.modal();
		this.$('input:first').focus();
	    }
	});
	
	return view;
    });
