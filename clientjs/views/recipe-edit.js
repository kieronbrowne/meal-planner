define(
    ["text!templates/recipe-edit.html"],
    
    function(recipeEditTemplate) {
	var view = Backbone.View.extend({
	    
	    className: 'recipeEdit modal',
	    
	    template: _.template(recipeEditTemplate),
	    
	    events: {
		"submit": "handleSubmit"
	    },
	    
	    render: function() {
		this.model.set('action', this.model.isNew() ? 'Create' : 'Save');
		this.$el.html(this.template(this.model.attributes));
		return this;
		},
	    
	    handleSubmit: function() {
		return false; //TODO implement method!
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
