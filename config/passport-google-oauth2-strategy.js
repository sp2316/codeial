const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const user=require('../models/users');
const User = require('../models/users');

// Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:'510110901100-ooi9di0hjqdsp0ub497ckjrf80ci79kb.apps.googleusercontent.com',
    clientSecret:'Lvo8DzKKfvG5fH-_3_xKjma7',
    callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        // Find the user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in Google Strategy passport',err); return;}
        // console.log(profile);
        if(user){
            // if found set this user as req.user
            return done(null,user);
        }
        else{
            // if not found,create the user and set it as req.user (which means sign in the user)
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('Error in Google Strategy passport',err); return;}
                else{
                    return done(null,user);
                }

            })
        }
    })



    }

));

module.exports=passport;