
/*
 * GET home page.
 */

var Recipe = require('../models/recipe');

exports.index = function(req, res){
  var toast = new Recipe({name: 'Toast'});
  console.dir(toast);
  toast.setName('Desire');
  res.render('index', { title: 'Express', recipe: toast });
};
