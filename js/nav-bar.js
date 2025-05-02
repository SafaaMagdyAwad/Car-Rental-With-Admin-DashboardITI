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


// dark mode 

let darkmode = localStorage.getItem("darkmode");
const themeSwitch =document.getElementById("theme_switch");
const enableDarkmode=()=>{
   document.body.classList.add("darkmode");
    localStorage.setItem("darkmode" , "active");
}

const disableDarkmode=()=>{
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode" , null);
}

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
})