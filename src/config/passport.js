const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
let argon2 = require('argon2')

// Local Strategy for login
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await userModel.findOne({ email, isDeleted: false });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }

        const isMatch = await argon2.verify(user.password, password)
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);  // Authentication successful
    } catch (error) {
        return done(error);
    }
}));
