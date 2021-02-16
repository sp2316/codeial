const passport = require('passport');

const JWTStrategy=require('passport-jwt').Strategy;

const extractJWT = require('passport-jwt').ExtractJwt;

const User=require('../models/users');

let opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken() ,
    secretOrKey:'Codeial'
}

//used after jwt is generated,to authenticate it
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null,user); //putting user in the request as req.user
        }else{
            return done(null,false); 
        }
    })


}));

module.exports=passport;