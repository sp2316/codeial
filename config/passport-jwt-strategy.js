const passport = require('passport');
const { deleteOne } = require('../models/users');

const JWTStrategy=require('passport-jwt').Strategy;

const extractJWT = require('passport-jwt').ExtractJwt;

const User=require('../models/users');

let opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'Codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false); 
        }
    })


}));

module.exports=passport;