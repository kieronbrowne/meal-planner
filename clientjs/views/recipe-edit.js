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
		var recipeName = this.$('[name=name]').val();
		var tags = this.$('[name=tags]').val();
		var self = this;
		var isNew = this.model.isNew();
		if (recipeName !== "") {
		    this.model.set({name: recipeName, tags: tags});
		    this.model.save({}, {
			success: function(model) {
			    model.attributes.tags = tags;
			    if (isNew) {
				model.collection.add(model);
			    }
			    self.$('.close').click();
			    window.calApp.collections.tags.fetch();
			}
		    });
		}
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
