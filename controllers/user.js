
/*
 * GET users listing.
 */

exports.get = function(req, res, next) {
    res.send(req.session.user);
};