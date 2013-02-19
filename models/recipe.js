var mongoose = require('mongoose')
 , Schema = mongoose.Schema;

var ingredientSchema = new Schema({
	name: String,
    	quantity: Number,
    	unit: String
});

ingredientSchema.methods.getQuantityStr = function() {
	if (this.quantity)
		return '' + this.quantity  + this.unit;
	return '';
};

var recipeSchema = new Schema({
	name: String,
    	portions: Number,
    	ingredients: [ingredientSchema],
    	method: String
});

recipeSchema.statics.getUnits = function() {
	return ['', 'g', 'ml', 'tsp', 'tbsp'];
};

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

recipeSchema.methods.addIngredient = function(name, quantity, unit) {
	ingredient = new Ingredient();
	ingredient.name = name;
	ingredient.quantity = quantity;
	ingredient.unit = unit;
	ingredient = {name: name, quantity: quantity, unit: unit};
	this.ingredients.push(ingredient);
};

recipeSchema.methods.removeIngredient = function(index) {
	for
	this.ingredients = this.ingredients.splice(index, 1);
};

recipeSchema.methods.setName = function(name) {
	this.name = "A Recipe Called '" + name + "'";
};


var model = module.exports = mongoose.model('Recipe', recipeSchema);
