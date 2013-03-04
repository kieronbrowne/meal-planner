
/*
 * GET home page.
 */

var Recipe = require('../models/recipe');

exports.index = function(req, res){
  res.render('index', { title: 'Meal Planner' });
};
