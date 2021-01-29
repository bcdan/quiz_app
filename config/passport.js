const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load Teacher model
const Teacher = require('../models/Teacher');

module.exports = function (passport) {
	passport.use(
		new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
			// Match Teacher
			Teacher.findOne({
				username: username
			}).then(teacher => {
				if (!teacher) {
					return done(null, false, { message: 'That username is not registered' });
				}

				// Match password
				bcrypt.compare(password, teacher.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						return done(null, teacher);
					} else {
						return done(null, false, { message: 'Password incorrect' });
					}
				});
			});
		})
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		Teacher.findById(id, function (err, user) {
			done(err, user);
		});
	});
};