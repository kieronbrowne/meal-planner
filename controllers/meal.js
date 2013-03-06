var Meal = require('../models/meal');
var DateUtils = require('../utils/date');

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

exports.find = function(req, res) {
	var start = new Date(parseInt(req.query.start));
	var end = new Date(parseInt(req.query.end));
	Meal.find({date: {$gte: start, $lte: end}}, function(err, resp) {
		res.send(resp);
	});	
};

exports.editNew = function(req, res) {
	var date = req.query.day;
	var meal = new Meal({date: date});
	res.render('meal/createNew', {meal: meal, title: 'Add meal'});
};

exports.create = function(req, res) {
	var date = DateUtils.strToDate(req.body.date);
	var name = req.body.meal;
	var meal = new Meal();
	meal.date = date;
	meal.name = name;
	meal.save(function(err) {
		if (!err) {
			return res.send({title: meal.name, start: meal.date, id: meal.id});
		}
	});
};

exports.edit = function(req, res) {
	var id = req.params.id;
	Meal.findById(id, function(err, meal) {
		res.render('meal/edit', {meal: meal, title: 'Edit meal'});
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	var date = DateUtils.strToDate(req.body.date);
	var name = req.body.meal;
	Meal.findById(id, function(err, meal) {
		meal.date = date;
		meal.name = name;
		meal.save(function(err) {
			if (!err) {
				return res.send({title: meal.name, start: meal.date, id: meal.id});
			}
		});
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Meal.findById(id, function(err, meal) {
		meal.remove(function(err) {
			res.redirect('/');
		});
	});
};
