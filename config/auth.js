module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		req.flash('error_msg', 'Please log in to view this resource');
		res.redirect('/teachers/login');

	},
	ensureNotAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		res.redirect('/');
	}
};
