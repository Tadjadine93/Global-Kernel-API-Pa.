"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const passport_jwt_1 = require("passport-jwt");
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user.models');
// JSON Web Tokens Strategy
passport.use(new JwtStrategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'codeworkrauthentification'
}, (payLoad, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user specified in token
        const user = yield User.findById(payLoad.sub);
        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})));
// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user given the email
        const user = yield User.findOne({ email });
        // If not, handle it
        if (!user) {
            return done(null, false);
        }
        // Check if the password is correct
        const isMatch = yield user.isValidPassword(password);
        // If not, handle it
        if (!isMatch) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
})));
//# sourceMappingURL=passport.js.map