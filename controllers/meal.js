var Meal = require('../models/meal');

exports.calendar = function(req, res) {
	var start = new Date(1000 * req.query.start);
	var end = new Date(1000 * req.query.end);
	Meal.find({date: {$gte: start, $lte: end}}, function(err, resp) {
		var list = [];
		resp.forEach(function(meal) {
			var item = {
				title: meal.name,
				start: meal.date,
				id: meal.id
			};
			list.push(item);
		});
		res.send(list);
	});
};

exports.editNew = function(req, res) {
	var date = req.query.day;
	var meal = new Meal({date: date});
	res.render('meal/createNew', {meal: meal, title: 'Add meal'});
};

exports.create = function(req, res) {
	var date = new Date(req.body.date);
	date.setHours(12);
	var name = req.body.meal;
	var meal = new Meal();
	meal.date = date;
	meal.name = name;
	meal.save(function(err) {
		res.redirect('/');
	});
};

exports.edit = function(req, res) {
	var id = req.params.id;
	Meal.findById(id, function(err, meal) {
		res.render('meal/edit', {meal: meal, title: 'Edit meal'});
	});
};

exports.update = function(req, res) {
	console.log('asdf');
	var id = req.params.id;
	var date = new Date(req.body.date);
	date.setHours(12);
	var name = req.body.meal;
	Meal.findById(id, function(err, meal) {
		meal.date = date;
		meal.name = name;
		meal.save(function(err) {
			res.redirect('/');
		});
	});
};
