const User = require("../models/users");

// since there is no nesting level,no need to keep it to async await
module.exports.profile=function(req,res){

    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'User Profile',
            profile_user:user
    });

    });
}


module.exports.update = function(req,res){
    if(req.user.id == req.params.id){

        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            req.flash('success','User details updated');
            return res.redirect('back');

        });
    }else{
        req.flash('error','Error in updating details');
       // return res.status(401).send('Unauthorized');  //400-unauthorized
    }


}

// Render the sign up page
module.exports.signup= function(req,res){
    if(req.isAuthenticated()){ //if logged in sign up page shouldnt be shown
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    });
};

// Render the sign in page

module.exports.signin=function(req,res){ //if logged in sign in page shouldnt be shown
    if(req.isAuthenticated()){
      return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Sign In'
    });
};

// Get the sign up data
module.exports.create=function(req,res){

if(req.body.password != req.body.confirm_password){
    req.flash('error','Passwords dont match');
    return res.redirect('back');
}
  User.findOne({email:req.body.email},function(err,user){
       if(err){
           console.log('error in finding user in signing up');
           return;
       }
       if(!user){
           User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating user while signing up');
                return;
            }
            return res.redirect('/users/sign-in');
           })
       }
       else{
        req.flash('error','Email id already exists');
        return res.redirect('back');

       }
  })

}

// sign in and create a session for the user
module.exports.createSession=function(req,res){

    req.flash('success','Logged in Successfully');
    return res.redirect('/');
    
}


module.exports.destroySession= function(req,res){
    req.logout(); //passport method
    req.flash('success','You have Logged out');
    return res.redirect('/');
}