var Tag = require('../models/tag');

exports.find = function(req, res) {
	Tag.find({}, function(err, resp) {
		res.send(resp);
	});	
};

exports.create = function(req, res) {
	var name = req.body.name;
	var tag = new Tag();
	tag.name = name;
	tag.save(function(err) {
		if (!err) {
			return res.send(tag);
		}
	});
};

exports.update = function(req, res) {
	var id = req.params.id;
	var name = req.body.name;
	Tag.findById(id, function(err, tag) {
		tag.name = name;
		tag.save(function(err) {
			if (!err) {
				return res.send(tag);
			}
		});
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	Tag.findById(id, function(err, tag) {
		tag.remove(function(err) {
			res.send({});
		});
	});
};
