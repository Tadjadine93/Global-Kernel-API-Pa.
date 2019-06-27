var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const JWT = require('jsonwebtoken');
const User = require('../models/user.models');
//const { JWT_SECRET } = require('../config/main');
function signToken(user) {
    return JWT.sign({
        iss: 'CodeWorker',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, 'codeworkrauthentification');
}
module.exports = {
    signUp: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.value.body;
        // Check if there is a user with the same email
        const foundUser = yield User.findOne({ email });
        if (foundUser) {
            res.status(403).json({ error: 'Email is already is use' });
        }
        //Create a new user
        const newUser = new User({
            email,
            password
        });
        yield newUser.save();
        // Generate the token
        const token = signToken(newUser);
        // Respond with token
        res.status(200).json({ token });
    }),
    signIn: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
        console.log('Successful login ! to get here !');
    }),
    secret: (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log('I managed to get here !');
        res.json({ secret: 'resource' });
    })
};
//# sourceMappingURL=user.controllers.js.map