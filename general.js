function username_set(){
    localStorage["user"] = document.querySelector("#user").value
    document.querySelector("#signin_form").action = "social_media.html"
    }

function register_check(){
    let psw = document.querySelector("#psw").value
    let psw_repeat = document.querySelector("#psw-repeat").value
    

    if (psw_repeat != psw){
        alert("Error: Your passwords do not match.")
    }
    if (psw_repeat == psw) {
        localStorage["user"] = document.querySelector("#user").value
        document.querySelector("#registration").action = "social_media.html"
    }
    }



