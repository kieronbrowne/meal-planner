var mongoose = require('mongoose')
, Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String, // unique
    fullName: String,
    hashedPassword: String,
    salt: String,
    createdOn: Date,
    status: String
});

userSchema.methods.genSalt = function() {
    return 'foo';
};

userSchema.methods.hashPasswd = function(passwd) {
    return this.salt + 'xxx' + passwd;
};

var model = module.exports = mongoose.model('User', userSchema);