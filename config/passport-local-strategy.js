const passport= require('passport');
const User = require('../models/users');

const LocalStrategy =require('passport-local').Strategy;

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email' //In our schema email is the unique field and we kept it as username
   },
   function(email,password,done){ 
    // done is a callback function reporting to passort js
    // Find a user and establish the identity
    User.findOne({email:email},function(err,user){
         if(err){
             console.log('Error in finding User --> Passport');
             return done(err);//error
         } 
         if(!user || user.password != password){
             console.log('Invalid Username/Password');
             return done(null,false); //no error but user authenication failed
         }
         return done(null,user); //no error and pass on the user

    });

   }

));

// Serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
})

// De serializing the user from the cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
        console.log('Error in finding the user --> Passport');
        return done(err);
    }
    return done(null,user);
    });

});

module.exports=passport;