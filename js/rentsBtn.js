//let bookedCars = JSON.parse(localStorage.getItem("bookedCars"));
(() => {
    //debugger;
    let user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (user) {
        let showMyRentReq = document.getElementById("show-rent-requests");
        let link = document.createElement("a");
        link.innerHTML = "Rents";
        link.setAttribute("href", "show-rent-requests.html?email=" + user.email);
        link.setAttribute("class", "nav-link");

        showMyRentReq.style.display = "block";
        showMyRentReq.appendChild(link);
    }}) ();
