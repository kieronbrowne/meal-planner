var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: String
});

tagSchema.statics.findOrCreate = function(tagList, next) {
    var count = tagList.length;
    var resList = [];
    var self = this;
    tagList.forEach(function(tag) {
	self.findOne({name: tag}, function(err, res) {
	    if (res == null) {
		self.create({name: tag}, function(err, res) {
		    resList.push(res);
		    count--;
		    if (count == 0) {
			next(resList);
		    }
		});
	    } else {
		resList.push(res);
		count--;
		if (count == 0) {
		    next(resList);
		}
	    }
	});
    });
};

tagSchema.statics.removeIfUnused = function(tagIdList, next) {
    var Recipe = require('./recipe');

    var count = tagIdList.length;
    var self = this;

    tagIdList.forEach(function(tagId) {
	Recipe.findOne({tags: tagId}, function(err, recipe) {
	    if (recipe == null) {
		self.remove({_id: tagId}, function() {
		    count--;
		    if (count == 0) {
			next();
		    }
		});
	    } else {
		count--;
		if (count == 0) {
		    next();
		}
	    }
	});
    });
};

var model = module.exports = mongoose.model('Tag', tagSchema);