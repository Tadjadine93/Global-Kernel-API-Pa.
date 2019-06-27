const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
import { ExtractJwt } from 'passport-jwt';
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.models');

// JSON Web Tokens Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'codeworkrauthentification'
}, async (payLoad, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payLoad.sub);

        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        // Find the user given the email
        const user = await User.findOne({ email });

        // If not, handle it
        if (!user) {
            return done(null, false);
        }
        // Check if the password is correct
        const isMatch = await user.isValidPassword(password);

        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }

        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }

}));