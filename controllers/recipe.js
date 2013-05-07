var Recipe = require('../models/recipe');
var Tag = require('../models/tag');
var _ = require('underscore');

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

exports.update = function(req, res) {
    var name = req.body.name;
    var id = req.params.id;
    var tags = req.body.tags;
    var tagList = _.map(tags.split(','), function(tag) {return tag.trim().toLowerCase();});
    Tag.findOrCreate(tagList, function(tagObjs) {
	Recipe.findOne({_id: id}, function(err, recipe) {
	    recipe.name = name;
	    recipe.tags = tagObjs;
	    recipe.save(function(err, recipe) {
		recipe.populate('tags', function(err, recipe) {
		    res.send(recipe);
		});
	    });
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
