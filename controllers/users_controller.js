module.exports.profile=function(req,res){
    return res.render('user_profile',{title:'User Profile'});
}

// Render the sign up page
module.exports.signup= function(req,res){
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    });
};

// Render the sign in page

module.exports.signin=function(req,res){
    
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    });
};

// Get the sign up data
module.exports.create=function(eeq,res){
// to do
}

// sign in and create a session for the user
module.exports.createSession=function(req,res){
    // to do
}