const User = require('../models/user');

var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var Bcrypt = require('bcryptjs');
const crypto = require('crypto');

const forgetPasswordMailer = require('../mailers/forgetPassword_mailer');
const queue = require('../config/kue');
const forgetPasswordEmailWorker = require('../workers/forgetPassword_email_worker');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Rendering profile page
module.exports.profile = function(req, res){
    
        return res.render('profile', {
            title: 'User Profile'
        });
    

}

// get the sign up data
module.exports.create = function(req, res){

    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
  
        if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            req.flash('error', 'Failed Captcha Verification');
            return res.redirect('back');
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
                    return res.redirect('back');
                }
                
                //captcha is done and now normal sign up process function is followed 
                if (req.body.password != req.body.confirm_password){
                    req.flash('error', 'Passwords do not match');
                    return res.redirect('back');
                }
        
                User.findOne({email: req.body.email}, function(err, user){
                    if(err){req.flash('error', err); return}
            
                    if (!user){
                        req.body.password = Bcrypt.hashSync(req.body.password, 10);
                        User.create(req.body, function(err, user){
                            if(err){req.flash('error', err); return}
            
                            req.flash('success', 'You have signed up');
                            console.log("Sign up successful");
                            return res.redirect('/');
                        })
                    }else{
                        req.flash('error', 'User already exists');
                        return res.redirect('back');
                    }
        
            });
        });

   
}

//Rendering the profile after successful sign in
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    console.log("Sign in successful");
    return res.redirect('/users/profile');
}


//Function for destroying the session and redirecting to home page after sign out.
module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}

//Rendering reset page
module.exports.reset=function(req,res){
    return res.render('reset', {
        title: 'Reset Password'
    });
}


//Reset function for checking all border cases and resetting the password
module.exports.resetPassword=function(req,res){
    console.log(req.body.new_password);
    if(req.body.new_password!=req.body.confirm_new_password){
        console.log('confirm password not matched');
        req.flash('error', 'Confirm password does not match');
        return res.redirect('back');
    }
    User.findOne({email:req.user.email},function(err,user){
        if(err){
            console.log(`Error in finding the user while reset password: ${err}`);
            req.flash('error', 'Error in finding the user while resetting password');
        }
        console.log('user: ', user);
        console.log('user old password :',req.body.old_password);
        
        if(Bcrypt.compareSync(req.body.old_password,user.password)){
            req.body.new_password=Bcrypt.hashSync(req.body.new_password,10);
            User.findOneAndUpdate({email:req.user.email},{$set:{password:req.body.new_password}},function(err,success){
                if(err){
                    console.log(`Error in reset password : ${err}`);
                    req.flash('error', 'Error in finding the user while resetting password');
                    res.redirect('back');
                }
                console.log('Password Reset Successfully');
                req.flash('success', 'Reset password successfully')
                return res.redirect("/users/profile");
            });
            console.log("inside bcrypt");
        }
        else{
            req.flash('error', 'Old password is not matched');
            return res.redirect('back');
        }
    });
}


//Function for forget password feature.
// Basically, creating a random password and updating the user password with newly generated random password and then using queue for execution of parallel job which will send mail having password.

module.exports.forgetPassword=function(req,res){
    
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log(`Error in finding the user while forgetting password: ${err}`);
            req.flash('error', 'Error in finding the user while forgetting password');
        }
    if(!user)
    {
        console.log(`Error in finding the user while forgetting password: ${err}`);
            req.flash('error', 'This user does not exist');
            return res.render('/');
    }    
    var randomPassword = crypto.randomBytes(20).toString('hex');
    var encryptedPassword=Bcrypt.hashSync(randomPassword,10);
    User.findOneAndUpdate({email:req.body.email},{$set:{password:encryptedPassword}},function(err,success){
        if(err){
            console.log(`Error in setting forget password : ${err}`);
            req.flash('error', 'Error in finding the user while forgetting password');
            res.redirect('back');
        }
        let job = queue.create('emails', {email:req.body.email, randomPassword:randomPassword}).save(function(err){
            if (err){
                console.log('Error in sending to the queue', err);
                return;
            }
            console.log('job enqueued', job.id);
    
        })
        console.log('Forget password mail sent Successfully');
        req.flash('success', 'Forget password mail sent Successfully')
        return res.redirect("/");
    });    
    


    });    
}


