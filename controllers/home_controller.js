const Post = require("../models/posts");


module.exports.home=function(req,res){
   
         //populate the user of each post
     Post.find({})
     .populate('user')
     .populate({
         path:'comments',
         populate:{
             path:'user'
         }
     })
     .exec(function(err,posts){
        //  'user' is the name of the attribute in the post database
        return res.render('home', {
            title:'Home',
            posts: posts
        });

     })



}
// module.exports.actionName = function(req,res){}