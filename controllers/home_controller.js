const Post = require("../models/posts");


module.exports.home=function(req,res){
   
    if(req.isAuthenticated()){ //if logged in sign up page shouldnt be shown
         //populate the user of each post
     Post.find({}).populate('user').exec(function(err,posts){
        //  'user' is the name of the attribute in the post database
        return res.render('home', {
            title:'Home',
            posts: posts
        });

     })

}
else{ 
    return res.redirect('/users/sign-up');

}
}
// module.exports.actionName = function(req,res){}