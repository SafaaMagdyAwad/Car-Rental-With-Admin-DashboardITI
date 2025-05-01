let loginButton=document.getElementById("loginButton");


// if currentUser is empty show login else show logout

let curentUser=JSON.parse(sessionStorage.getItem("currentUser"))||{};

if(Object.keys(curentUser)==0){
    //empty user need to login
    loginButton.href="Login.html";
    loginButton.innerText="Login";

}else{
    // user has a session
    loginButton.innerText="LogOut";
    loginButton.addEventListener("click",()=>{
        sessionStorage.removeItem("currentUser");
        alert("You logged out successfully!");
        loginButton.innerText="Login";
    });
}