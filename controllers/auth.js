var User = require('../models/user');
var title = 'Login';

exports.checkAuth = function(req, res, next) {
    if (req.path == '/auth/login') {
	return next();
    }
    if (typeof req.session.loggedIn == 'undefined' || ! req.session.loggedIn) {
	return res.render('auth/login', {title: title, username: ""});
    }
    next();
};

exports.login = function(req, res, next) {
    var username = req.body.username;
    User.findOne({username: username}, function(err, user) {
	console.dir(user);
	if (err) return next(err);
	if (user != null && user.hashPasswd(req.body.password) == user.hashedPassword) {
	    req.session.loggedIn = true;
	    req.session.user = user;
	    return res.redirect(303, 'back');
	} else {
	    console.log('auth failed for ' + username);
	    return res.render('auth/login', {title: title, username: username, err: 'Authentication failed'});
	}
    });
};