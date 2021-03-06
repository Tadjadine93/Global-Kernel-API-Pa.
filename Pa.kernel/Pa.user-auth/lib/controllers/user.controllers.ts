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
    signUp: async (req, res, next) => {    
        const { email, password } = req.value.body;

        // Check if there is a user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            res.status(403).json({ error: 'Email is already is use'});
        }

        //Create a new user
        const newUser = new User({
            email,
            password
        });
        await newUser.save();

        // Generate the token
        const token = signToken(newUser);

        // Respond with token
        res.status(200).json({ token });
        
    },

    signIn: async (req, res, next) => {
        // Generate token
        const token = signToken(req.user);
        res.status(200).json({ token });
        console.log('Successful login ! to get here !');
    },

    secret: async (req, res, next) => {
        console.log('I managed to get here !');
        res.json({ secret: 'resource'});
    }

}  