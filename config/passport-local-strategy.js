const passport= require('passport');
const User = require('../models/users');

const LocalStrategy =require('passport-local').Strategy;

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email', //In our schema email is the unique field and we kept it as username
    passReqToCallback:true
    },
   function(req,email,password,done){ 
    // done is a callback function reporting to passort js
    // Find a user and establish the identity
    User.findOne({email:email},function(err,user){
         if(err){
            req.flash('error',err);
            return done(err);//error
         } 
         if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
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

// Deserializing the user from the cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
        console.log('Error in finding the user --> Passport');
        return done(err);
    }
    return done(null,user);
    });

});

// Check if the User is authenticated
passport.checkAuthentication=function(req,res,next){
    // If user is signed in ,then pass the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // If the user is not signed in
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated())
    { 
     // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;