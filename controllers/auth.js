exports.checkAuth = function(req, res, next) {
    if (req.path == '/auth') {
	return next();
    }
    if (typeof req.session.loggedIn == 'undefined' || ! req.session.loggedIn) {
	return res.render('login', {prevPath: req.path, prevQuery: req.query, title: 'Login'});
    }
    next();
};

exports.login = function(req, res, next) {
    req.session.loggedIn = true;
    res.redirect(303, 'back');
};