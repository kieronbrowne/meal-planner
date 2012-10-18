var Recipe = require('../models/recipe');

exports.list = function(req, res){
	var recipes = Recipe.find({}, function(err, recipes) {
		if (err) return console.log(err);
		res.render('recipe/list', {recipes: recipes, title: 'Recipes'});
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
	Recipe.findOne({_id: id}, function(err, recipe) {
		res.render('recipe/edit', {recipe: recipe, title: 'Recipes'});
	});
};

exports.update = function(req, res) {
	var name = req.body.name;
	var id = req.params.id;
	Recipe.findOne({_id: id}, function(err, recipe) {
		recipe.name = name;
		recipe.save(function(err) {
			res.redirect('/recipe/'+id);
		});
	});
};
