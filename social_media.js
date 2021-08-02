function post_button() {
    let username = localStorage["user"]
    let post_div = document.querySelector("#new_div");
    let post_body = document.querySelector("#post_text");
    let posting_user = "@" + username + " asks:";
    let commenting_user = "@" + username + " says:";
    let submit = document.querySelector("#submit");
    
    let storedcomments = localStorage.getItem("storedcomments")
    let comments;

    let storedposts = localStorage.getItem("storedposts");
    let posts;

    if (storedposts === null){
        posts = []
    }else{
        posts = JSON.parse(storedposts);
    }

    for (let post_index = 0; post_index < posts.length; post_index++){
        let post = posts[post_index]
        let localposts = document.querySelector("#post_template").content.cloneNode(true);
        let name = localposts.querySelector('.user_post');
        name.innerText = post['name']
        let body = localposts.querySelector('.post_body');
        body.innerText = post['post_body'];
        let date = localposts.querySelector('.datetime');
        date.innerText = post['date'];

        let comment_template = localposts.querySelector(".comment_template");
        let commentbutton = localposts.querySelector(".commentbutton");
        let comment_input = localposts.querySelector(".comment");
        let comment_div = localposts.querySelector(".comment_div");
        
        commentbutton.addEventListener('click', function(){
            let cdt = new Date()
            let comment_clone = comment_template.content.cloneNode(true);
            comment_clone.querySelector(".comment_body").innerText = comment_input.value;
            comment_clone.querySelector(".comment_user").innerText = "@" + username + " says:";
            comment_clone.querySelector(".datetime").innerText = cdt;
            

            let exist_comments_body = localStorage.getItem('storedcomments')
            let exist_comments;

            if (exist_comments_body === null){
                exist_comments = [];
            }else{
                exist_comments = JSON.parse(exist_comments_body)
            }
            
            let comment_content = {
                "name" : commenting_user,
                "comment_body" : comment_input.value,
                "comment_date" : Date(),
                "post_index" : post_index
            }
            
            exist_comments.push(comment_content);
            
            localStorage.setItem("storedcomments", JSON.stringify(exist_comments));

            comment_div.appendChild(comment_clone);
            comment_input.value = ""
        });

        post_div.appendChild(localposts);
    }

    if (storedcomments === null){
        comments = []
    }else{
        comments = JSON.parse(storedcomments)
    }

    for (let comment of comments){
        let post_index = comment["post_index"]
        let exist_comment_div = document.querySelectorAll(".comment_div")[post_index];
        let comment_template = exist_comment_div.querySelector('.comment_template');
        let commentposts = comment_template.content.cloneNode(true);
        let comment_name = commentposts.querySelector('.comment_user');
        comment_name.innerText = comment['name'];
        let comment_body = commentposts.querySelector(".comment_body");
        comment_body.innerText = comment['comment_body'];
        let comment_date = commentposts.querySelector(".datetime");
        comment_date.innerText = comment['comment_date'];
        exist_comment_div.appendChild(commentposts)
        }
      
    
  
    submit.addEventListener('click', function(){
        if (post_body.value != ""){
            let dt = new Date();
            let post_template = document.querySelector("#post_template");
            let post_clone = post_template.content.cloneNode(true);
            post_clone.querySelector(".user_post").innerText = posting_user;
            post_clone.querySelector(".post_body").innerText = post_body.value;
            post_clone.querySelector(".datetime").innerText = dt;
            let commentbutton = post_clone.querySelector(".commentbutton")
            let comment_div = post_clone.querySelector(".comment_div");
            let comment_body = post_clone.querySelector(".comment")   ;
            let comment_template = post_clone.querySelector(".comment_template");  
            let exist_posts_body = localStorage.getItem('storedposts')
            let exist_posts;

            if (exist_posts_body === null){
                exist_posts = [];
            }else{
                exist_posts = JSON.parse(exist_posts_body)
            }
            let post_content = {
                "name" : posting_user,
                "post_body" : post_body.value,
                "date" : Date(),
            }
            exist_posts.push(post_content)
            let post_index = exist_posts.length -1;
            localStorage.setItem("storedposts", JSON.stringify(exist_posts));

            

            commentbutton.addEventListener('click', function(){
                let cdt = new Date()
                let comment_clone = comment_template.content.cloneNode(true);
                comment_clone.querySelector(".comment_body").innerText = comment_body.value;
                comment_clone.querySelector(".comment_user").innerText = commenting_user;
                comment_clone.querySelector(".datetime").innerText = cdt;
                
                
                let exist_comments_body = localStorage.getItem('storedcomments')
                let exist_comments;

                if (exist_comments_body === null){
                    exist_comments = [];
                }else{
                    exist_comments = JSON.parse(exist_comments_body)
                }
                
                let comment_content = {
                    "name" : commenting_user,
                    "comment_body" : comment_body.value,
                    "comment_date" : Date(),
                    "post_index" : post_index
                }
                
                exist_comments.push(comment_content)
                
                localStorage.setItem("storedcomments", JSON.stringify(exist_comments));

                comment_div.appendChild(comment_clone);
                comment_body.value = ""
            })

            post_div.appendChild(post_clone);
            post_body.value = ""
            
        }
    })
}

window.addEventListener("load",post_button)

function username_get(){
    username = localStorage["user"]
    document.querySelector("#posting_user").innerText = "Logged in as: " + "@" + username
    }