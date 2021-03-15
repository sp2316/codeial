const Post = require("../models/posts");
const User=require('../models/users');

module.exports.home=async function(req,res){
   
    try{
         //populate the user of each post
        let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
             path:'comments',
             populate:{
               path:'user'
            },
            populate:{
               path:'likes' //for comments
            }
        }).populate('likes');//for post

        let user= await User.find({});

        return res.render('home', {
             title:'Home',
             posts: posts,
             all_users:user
            });
       

    }catch(err){
      console.log('Error',err);
      return;
    }
   
 }
    



// module.exports.actionName = function(req,res){}