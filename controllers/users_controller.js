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