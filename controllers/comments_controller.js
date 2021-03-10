const Comment=require('../models/comment');
const Post = require('../models/posts');
const commentsMailer=require('../mailers/comments_mailer');
module.exports.create=async function(req,res){
    try{
        let post= await Post.findById(req.body.post);

        if(post){
          let comment= await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });

              post.comments.push(comment); //Automatically fetch out the id and push it
              post.save(); 

              comment = await comment.populate('user','name email').execPopulate();
              commentsMailer.newComment(comment);
              if(req.xhr){

                return res.status(200).json({

                    data:{
                        comment:comment,
                    },
                    message: "comment created!"
                })

              }

              req.flash('success','Comment posted');
              //Whenever we make changes to object,save tells database that this is the final version of object,so block it
              //before that data is in the ram,after save it will be in database 
              res.redirect('/');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');

    }

}

module.exports.destroy=async function(req,res){

try{
        //  checking whether exists or not before deleting it
        let comment=await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
        // save post id before deleting the comment,so that we could go to that post id and delete the comment from the comments[] list
            let postId = comment.post;
            comment.remove();
        //$pull is inbuilt, pulls out the id matching with the id given
            await Post.findByIdAndUpdate(postId,{$pull : {comments: req.params.id}});
         
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success','Comment deleted');
            return res.redirect('back');

    } else{
       return res.redirect('back');
    }

}catch(err){
    req.flash('error',err);
    return res.redirect('back');

    }
 

}