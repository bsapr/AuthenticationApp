const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

const path = require('path');
 require('dotenv').config();
 console.log("environment",process.env.user);
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '137962315721-9k30vu6lhhds5u1op29jtbg5ae7di8uu.apps.googleusercontent.com', 
        clientSecret: 'mFjZs4sOne76I_ZUtyzet5-O',
        callbackURL: "http://localhost:8000/users/auth/google/callBack",
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
          

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
