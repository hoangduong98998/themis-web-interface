const passport = require('passport');
const md5 = require('md5');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./user');

passport.serializeUser((user, cb) => {
	cb(null, user.username);
});

passport.deserializeUser((id, cb) => {
	const user = User.find(id);
	if (user === null)
		return cb(new Error('User not found!'), null);
	cb(null, user);
});

module.exports = new LocalStrategy((username, password, cb) => {
	const user = User.find(username);
	if (user === null)
		return cb(null, false, {message: 'User not found!'});
	if (user.password !== md5(password))
		return cb(null, false, {message: 'Wrong password'});
	cb(null, user);
});
