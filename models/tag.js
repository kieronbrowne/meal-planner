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

var model = module.exports = mongoose.model('Tag', tagSchema);
