let subscriptions=JSON.parse(localStorage.getItem("subscriptions"))||[];
let Newsletter=document.getElementById("Newsletter");
let email=document.getElementById("email");

Newsletter.addEventListener("click",()=>{
    //check if email exists
    let exists=false;
    subscriptions.forEach(subscription => {
        if(subscription==email.value){
            exists=true;
        }
    });
    if(!exists){// if it dosent exist add it 
        subscriptions.push(email.value);
        localStorage.setItem("subscriptions",JSON.stringify(subscriptions));
    }else{
        alert("Your email is already stored");
    }
});