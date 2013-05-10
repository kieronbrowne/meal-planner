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
		var isNew = this.model.isNew();
		if (mealName !== "") {
		    this.model.set({name: mealName});
		    this.model.save({}, {
			success: function(model) {
			    if (isNew) {
				model.collection.add(model);
			    }
			    self.$('.close').click();
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
