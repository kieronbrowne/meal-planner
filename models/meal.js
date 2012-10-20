var mongoose = require('mongoose')
 , Schema = mongoose.Schema;

var mealSchema = new Schema({
	name: String,
    	date: Date
});

var model = module.exports = mongoose.model('Meal', mealSchema);
