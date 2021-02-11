

    // method to submit the form data for new comment using AJAX
    let createComment=function(postId){
           let postContainer=$(`#post-${postId}`);
           let commentForm =$(`#post-${postId}-comments-form`);
           commentForm.submit(function(e){
           e.preventDefault(); //form does not send data to the url in the action attribute  due to this

           $.ajax({
               type:'POST',
               url:'/comments/create',
               data:commentForm.serialize(), //this converts post form data into json (content:value)
               success:function(data){
                   let newComment= newCommentDom(data.data.comment);
                   $(`#post-comments-${postId}`).prepend(newComment);
                   deleteComment($(' .delete-comment-button',newComment));
                   new Noty({
                    theme: 'relax',
                    text: "Comment published!",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
               },
               error:function(error){
                   console.log(err.responseText);
               }


           });


       });
    //    console.log($('.delete-comment-button'));   

       $(' .delete-comment-button',postContainer).each(function(){
        deleteComment($(this));
    });

   }


let newCommentDom=function(comment){
       return $(`
       <li id="comment-${ comment._id }">   
       <p>
            
            <small>
           <a class="delete-comment-button"  href="/comments/destroy/${comment._id}">X</a> 
           </small>
      
            ${comment.content}
            <br>
            <small>
              comment by  ${comment.user.name}
            </small>
       </p>     
      </li>
       
       `) 
}

let deleteComment=function(deleteLink){
    // console.log(deleteLink);
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url : $(deleteLink).prop('href'),
            success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
            },
            error:  function(error){

                console.log(error.responseText);

            }
        })
    });

} 
