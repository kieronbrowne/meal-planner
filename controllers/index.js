
/*
 * GET home page.
 */

var Recipe = require('../models/recipe');

exports.index = function(req, res){
  var toast = new Recipe({name: 'Toast'});
  toast.portions = 1;
  console.dir(toast);
  toast.save(function(err) {
	  if(err) console.log('oops');
  });
  toast.setName('Desire');
  res.render('index', { title: 'Express', recipe: toast });
};
