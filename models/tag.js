var mongoose = require('mongoose')
 , Schema = mongoose.Schema;

var tagSchema = new Schema({
	name: String
});

var model = module.exports = mongoose.model('Tag', mealSchema);
