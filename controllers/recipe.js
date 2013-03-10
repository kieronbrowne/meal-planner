var Recipe = require('../models/recipe');

exports.list = function(req, res){
	var tags = req.query.tags;
	var query = {};
	if (typeof(tags) !== 'undefined' && tags.length > 0) {
		tags = tags.split(",");
		query = {tags: {"$all": tags}};
	}
	Recipe.find(query)
	.populate('tags')
	.exec(function(err, recipes) {
		if (err) {
			return console.log(err);
		}
		res.send(recipes);
	});
};

exports.show = function(req, res) {
	var id = req.params.id;
	Recipe.findOne({_id: id}, function(err, recipe) {
		res.render('recipe/show', {recipe: recipe, title: 'Recipes'});
	});
};

exports.edit = function(req, res) {
	var id = req.params.id;
	units = Recipe.getUnits();
	Recipe.findOne({_id: id}, function(err, recipe) {
		res.render('recipe/edit', 
			{recipe: recipe, title: 'Recipes',
				units: units});
	});
};

exports.update = function(req, res) {
	var name = req.body.name;
	var id = req.params.id;
	Recipe.findOne({_id: id}, function(err, recipe) {
		recipe.name = name;
		recipe.portions = req.body.portions;
		recipe.save(function(err) {
			res.redirect('/recipe/'+id);
		});
	});
};

exports.addIngredient = function(req, res) {
	var ingredient = req.body.ingredient;
	var quantity = req.body.quantity;
	var unit = req.body.unit;
	var id = req.params.id;
	recipe = Recipe.findOne({_id: id}, function(err, recipe) {
		recipe.addIngredient(ingredient, quantity, unit);
		recipe.save(function(err) {
			res.send(recipe);
		});
	});
};

exports.removeIngredient = function(req, res) {
	var recipeId = req.params.id;
	var ingId = req.params.ingId;
	Recipe.findById(recipeId, function(err, recipe) {
		recipe.removeIngredient(ingId);
		recipe.save(function(err) {
			res.send({ok: !err, removedId: ingId});
		});
	});
};
