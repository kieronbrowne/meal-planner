var Recipe = require('../models/recipe');

exports.list = function(req, res){
	var recipes = Recipe.find({});
	console.dir(recipes);
	res.render('recipe/list', {recipes: recipes});
};
