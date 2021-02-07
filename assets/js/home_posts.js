{   
    // method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm =$('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault(); //form does not send data to the url in the action attribute  due to this

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(), //this converts post form data into json (content:value)
                success:function(data){
                    let newPost= newPostDom(data.data.post,data.data.user);
                    $('#posts-list-container > ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                },
                error:function(error){
                    console.log(err.responseText);
                }


            });


        });

    }
    // method to create a post in DOM
    let newPostDom=function(post,user){
        return $(`<li id="post-${post._id}">
                    <p> 
                        <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a> 
                        </small>
                        
                        ${post.content}
                    <br>
                    
                    <small>
                        Posted by ${user}
                    </small>
                    </p>
                    <div class="post-comments">
    
                        <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type here to add Comment..." required>   
                                <input type="hidden" name="post" value="${post._id}">
                                <input type="submit" value="Add Comment"> 
                        
                        </form>
                        
                        <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                        </div>
        
                    </div>
                </li>
                `)
    }

    //method to delete a post from DOM
    let deletePost=function(deleteLink){
        console.log(deleteLink);
        (deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url : (deleteLink).prop('href'),
                success: function(data){
                        console.log(data.data);
                        $(`#post-${data.data.post_id}`).remove();
                },
                error:  function(error){

                    console.log(error.responseText);

                }
            })
        });

    } 

    createPost();
}