const Post = require("../models/posts")
const Comment = require("../models/comment")


module.exports.create=async function(req, res){
 try{
//  since we dont need to use post again in this function no need to use let post
     await Post.create({
        content: req.body.content,
        user:req.user._id
    });
   
        return res.redirect('back');
    
    }catch(err){
    console.log('Error',err);
    return;
    }
}

module.exports.destroy =async function(req,res){
// Before deleting find if post exists in db
// format of url  is /posts/destroy/id ---> String param
try{
// since we r using post again we store the post using let post
     let post= await Post.findById(req.params.id);
// check if user who created the post is the one deleting it
// post.user requires a string id
    if(post.user == req.user.id) //convert ._id(object id) to string by using .id directly
        post.remove(); 
//  Delete comments associated with that post
        await Comment.deleteMany({post:req.params.id});

        return res.redirect('back');

     }catch(err){
        console.log('Error',err);
        return;
     }


}