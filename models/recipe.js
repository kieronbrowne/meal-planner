var mongoose = require('mongoose')
 , Schema = mongoose.Schema;

var recipeSchema = new Schema({
	name: String,
    	portions: Number
});

recipeSchema.methods.setName = function(name) {
	this.name = "A Recipe Called '" + name + "'";
};

var model = module.exports = mongoose.model('Recipe', recipeSchema);
