var mongoose = require('mongoose')
, Schema = mongoose.Schema
, Recipe = require('./tag');

var mealSchema = new Schema({
    name: String,
    date: Date,
    recipe: {type: Schema.Types.ObjectId, ref: Recipe}
});

mealSchema.methods.getDateStr = function() {
    if (!this.date) return '';
    var day = this.date.getUTCDate();
    var month = this.date.getUTCMonth() + 1;
    var year = this.date.getUTCFullYear();
    return day + '/' + month + '/' + year;
};

var model = module.exports = mongoose.model('Meal', mealSchema);
