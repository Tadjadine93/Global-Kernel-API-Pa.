//import * as express from 'express';
const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas } = require('../helpers/route.helpers');
const passport = require('passport');
const passportConf = require('../passport');
const UsersController = require('../controllers/user.controllers');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
router.route('/signup').
    post(validateBody(schemas.authSchema), UsersController.signUp);
router.route('/signin').
    post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);
router.route('/secret').
    get(passportJWT, UsersController.secret);
module.exports = router;
//# sourceMappingURL=user.routes.js.map