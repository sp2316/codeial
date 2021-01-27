const Comment=require('../models/comment');
const Post = require('../models/posts');
module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log('Error in finding post')
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                if(err){
                    return;
                }
              post.comments.push(comment); //Automatically fetch out the id and push it
              post.save(); 
              //Whenever we make changes to object,save tells database that this is the final version of object,so block it
              //before that data is in the ram,after save it will be in database 
               res.redirect('/');
            })
        }
    });

}

module.exports.destroy=function(req,res){
//  checking whether exists or not before deleting it
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
// save post id before deleting the comment,so that we could go to that post id and delete the comment from the comments[] list
         let postId = comment.post;
         comment.remove();
        //  $pull is inbuilt, pulls out the id matching with the id given
         Post.findByIdAndUpdate(postId,{$pull : {comments: req.params.id}},function(err,post){
             return res.redirect('back');
         })

        }else{
            return res.redirect('back');

        }
    })


}