const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

 router.get('/profile', passport.checkAuthentication, usersController.profile);

//Routing to sign up page.
router.post('/create', usersController.create);

//Routing to reset page
router.get('/reset', usersController.reset);

//For reset and forget password implementations
router.post('/reset-password', usersController.resetPassword);
router.post('/forget-password', usersController.forgetPassword);


//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), usersController.createSession);

//For signing out operation
router.get('/sign-out', usersController.destroySession);

//creating two routes - one for callback and another for redirecting to google authentication and defining the scope of access token
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), usersController.createSession);


module.exports = router;