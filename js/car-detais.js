let bookedCars = JSON.parse(localStorage.getItem("bookedCars")) || [];
const params = new URLSearchParams(window.location.search);
const carId = params.get("id");
// const carPrand = params.get("prand");

let user = JSON.parse(sessionStorage.getItem("currentUser"))||{};
let car = {};
// console.log(carId);

let cars = JSON.parse(localStorage.getItem("cars")) || [];
console.log(cars);

cars.forEach(acar => {
    if (acar["id"] == carId) {
        car = acar;
    }
});

// console.log(car);

let carCard = document.getElementById("carCard");

if (Object.keys(car).length === 0) {
    carCard.innerHTML = `
    <h1 class="text-danger"> This car is not stored in the system 🤔 </h1>
    `;
    book.style.display = "none";
} else {


    let image = document.createElement("img");
    image.src = `images/cars/${car.image}`;
    image.className = "img-fluid card-img-top";
    image.alt = car.prand;

    carCard.appendChild(image);

    let cardbody = document.createElement("div");
    cardbody.className = "card-body";
    carCard.appendChild(cardbody);

    let cursole = document.createElement("div");
    cursole.id = "carouselExampleAutoplaying";
    cursole.className = "carousel slide";
    cursole.setAttribute("data-bs-ride", "carousel");
    cardbody.appendChild(cursole);

    let cursoleinner = document.createElement("div");
    cursoleinner.className = "carousel-inner text-center";
    cursole.appendChild(cursoleinner);


    let elemnts = ["prand", "model", "type", "price", "category"];
    for (let i = 0; i < elemnts.length; i++) {

        let cursoleitem = document.createElement("div");
        if (i == 0) {
            cursoleitem.className = "carousel-item active";
        } else {
            cursoleitem.className = "carousel-item ";
        }
        cursoleinner.appendChild(cursoleitem);
        let header = document.createElement("h1");
        header.className = "text-darkblue ";
        let capitalizedElement = elemnts[i].charAt(0).toUpperCase() + elemnts[i].slice(1);
        header.innerText = `${capitalizedElement} :: ${car[elemnts[i]]}`;
        cursoleitem.appendChild(header);
    };

    // console.log(car.avilable);
    let renthistory = document.createElement("a");
    renthistory.className = "form-control btn btn-success mb-4 mt-4 pt-2 pb-2";
    renthistory.innerText = "Show Car Rental History";
    renthistory.href = `rentalhistory.html?id=${car["id"]}`;
    cardbody.appendChild(renthistory);
    if (car.avilable) {
        // Append the modal only once when car is available
        let button = document.createElement("button");
        button.className = "form-control btn btn-primary pt-2 pb-2";
        button.type = button;
        if (Object.keys(user).length === 0) {
            //user is not logedin
            button.innerText = "login";
            button.addEventListener("click",()=>{
                window.open("login.html","_self");
            })
        } else {
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#exampleModal");
            button.innerText = "Book Now 🎉 !";
        }
        cardbody.appendChild(button);

    } else {

        let button = document.createElement("button");
        button.className = "form-control btn btn-danger pt-2 pb-2";
        button.innerText = "This Car is not avilable right now 😥";
        cardbody.appendChild(button);
    }



    let submitbooking = document.getElementById("submitbooking");
    // console.log(submitbooking);

    submitbooking.addEventListener("click", (e) => {

        e.preventDefault();
        console.log("im in submit button");
        let pickDate = document.getElementById("pickDate").value;
        let pickTime = document.getElementById("pickTime").value;
        let dropDate = document.getElementById("dropDate").value;
        let dropTime = document.getElementById("dropTime").value;

        //validation
        console.log(!pickDate);
        if (!pickDate || !pickTime || !dropDate || !dropTime) {
            alert("Please Enter Valid Data");
        } else {
            // console.log(pickDate> dropDate);
            // if the drop date is less than pickup date show error message

            if(pickDate > dropDate){
                alert("the Drop date must be after the pic date");
            }else{
                //asking user for confirmation
                let con = confirm("Are You Sure You Want to Book This Car?");
                let temp = carId + "_" + Math.random();
                // if user confirmed
                if (con) {
                    //storing the data
                    // console.log(user);
                    bookobject = {
                        "rent-id": temp,
                        "car-id": carId,
                        "pick-up-date": pickDate,
                        "pick-up-time": pickTime,
                        "drop-date": dropDate,
                        "drop-time": dropTime,
                        "user-name": user.name,
                        "user-email": user.email,
                        "status": "pending",
                        "created-at":new Date(),
                        "prand":car["prand"],
                    }
                    bookedCars.push(bookobject);
                    //save in local storage
                    localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
                    alert("You book Request is sent to admin now 😊 ");
                }
            }
        }
    });






    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }





}

