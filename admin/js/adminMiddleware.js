//window.addEventListener("load" , adminMiddleware);


/* function adminMiddleware(){
    let user = JSON.parse(sessionStorage.getItem("currentUser"));

    console.log(user);
    if(user.role == "Superadmin" || user.role == "admin"){
        console.log("ok");
    }else{
        window.location.href = '../index.html';
    }
} */

(() => {
    let user = JSON.parse(sessionStorage.getItem("currentUser")) || {};
    if (Object.keys(user) == 0) {
        // console.log("no user");
        window.location.href = '/index.html';
    } else {

        console.log(user);
        if (user.role == "Superadmin" || user.role == "admin") {
            console.log("ok");
        } else {
            window.location.href = '/index.html';
        }
    }
})();