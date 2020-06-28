const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const request = require('request');

//Importing bcrypt for implentation of encryption and decryption
var Bcrypt = require('bcryptjs');

require('dotenv').config();

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){

             //Captcha implementation
         
         
            if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
                req.flash('error', 'Failed Captcha Verification');
                return done(null, false);
            }
             // Put your secret key here.
            var secretKey ='6LfNSqoZAAAAAJq9is-S2c7c1TVJyyno3eEsRJLB'; 
            // req.connection.remoteAddress will provide IP address of connected user.
            var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
            // Hitting GET request to the URL, Google will respond with success or error scenario.
            request(verificationUrl,function(error,response,body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if(body.success !== undefined && !body.success) {
                    req.flash('error', 'Failed Captcha Verification');
                    console.log("Failed Captcha Verification");
                    done(null, false);
                }
            });    


            // find a user and establish the identity
            User.findOne({email: email}, function(err, user)  {
                if (err){
                    req.flash('error', err);
                    return done(err);
                }

                // if (!user || user.password != password){
                //Using Bcrypt to decrypt the password.   
                if (!user || !Bcrypt.compareSync(req.body.password, user.password)){
                    req.flash('error', 'Invalid Username/Password');
                    return done(null, false);
                }

                return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;