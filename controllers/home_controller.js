const Post = require("../models/posts");


module.exports.home=function(req,res){
   
    if(req.isAuthenticated()){ //if logged in sign up page shouldnt be shown
         Post.find({},function(err,posts){
            return res.render('home', {
                title:'Home',
                posts: posts
            });
         
         });
        }     
        else
     return res.redirect('/users/sign-up');

}
// module.exports.actionName = function(req,res){}