const User = require("../models/users");

module.exports.profile=function(req,res){
    const user_id= req.cookies['user_id']; //or cookies.user_id
    // To change cookies at server side, res.cookie('user_id',25);
    if(user_id){
        User.findById(user_id,function(err,user){  //callback runs aynchronously
            if(err){
                console.log('Cant fetch user id');
                return;
            }
            if(user){
            return res.render('user_profile',{
                user:user,
                title:"User Profile"
            });
           }
           else{
            return res.redirect('/users/sign-in');
           }
        });
    }
    else{  //if we don't keep else here,this statement would be executed even before upper statements are executed and
    // this throwsan error- cannot set headers after they are sent to the client
        return res.redirect('/users/sign-in');
    }    
    
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
module.exports.create=function(req,res){

if(req.body.password != req.body.confirm_password){
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
           return res.redirect('back');
       }
  })

}

// sign in and create a session for the user
module.exports.createSession=function(req,res){
    // steps to authenticate
    //Find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in signing in');
            return;
        }
         //Handle User found 
         if(user){
              //handle password which dont match
              if(user.password!=req.body.password){
                  return res.redirect('back');
              }
              // handle session creation
              res.cookie('user_id',user.id);
              return res.redirect('/users/profile');
         }
         else{
              //Handle user not found
              return res.redirect('back');
         }

    });

}


module.exports.signout=function(req,res){

res.clearCookie('user_id'); //to clear a cookie
return res.redirect('/users/sign-in');

}