const Post = require("../models/posts")
const Comment = require("../models/comment")


module.exports.create=function(req, res){
    Post.create({
        content: req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating post');
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy = function(req,res){
// Before deleting find if post exists in db
// format of url  is /posts/destroy/id ---> String param

Post.findById(req.params.id,function(err,post){
// check if user who created the post is the one deleting it
// post.user requires a string id
    if(post.user == req.user.id) {//convert ._id(object id) to string by using .id directly
     post.remove(); 
//  Delete comments associated with that post
     Comment.deleteMany({post:req.params.id},function(err){
         return res.redirect('back');
     });
    }else{
        return res.redirect('back');
    }
});




}