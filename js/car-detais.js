let submitbtn = document.getElementById("submitbutton");
let bookform = document.getElementById("book");
let submitbooking = document.getElementById("submitbooking");
let bookedCars = JSON.parse(localStorage.getItem("bookedCars")) || [];

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");
let car = {};
console.log(carId);

let cars = JSON.parse(localStorage.getItem("cars")) || [];
console.log(cars);

cars.forEach(acar => {
    if (acar["id"] == carId) {
        car = acar;
    }
});

console.log(car);

let carCard = document.getElementById("carCard");

if (Object.keys(car).length === 0) {
    carCard.innerHTML = `
    <h1 class="text-danger"> This car is not stored in the system 🤔 </h1>
    `;
    book.style.display = "none";
} else {


    let image = document.createElement("img");
    image.src = `../images/cars/${car.image}`;
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

    console.log(car.avilable);

    if (car.avilable) {
        let button = document.createElement("a");
        button.className = "form-control btn btn-primary pt-2 pb-2";
        button.href = `#book`;
        button.innerText = "Book Now 🎉 !";
        cardbody.appendChild(button);
    } else {
        let button = document.createElement("a");
        button.className = "form-control btn btn-primary pt-2 pb-2";
        button.innerText = "This Car is not avilable right now 😥";
        cardbody.appendChild(button);
    }


    submitbooking.addEventListener("click", (e) => {

        e.preventDefault();
        console.log("im in submit button");
        let pickDate = document.getElementById("pickDate").value;
        let pickTime = document.getElementById("pickTime").value;
        let dropDate = document.getElementById("dropDate").value;
        let dropTime = document.getElementById("dropTime").value;
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        //validation
        console.log(!pickDate);
        if (!pickDate || !pickTime || !dropDate || !dropTime || !name || !email) {
            alert("Please Enter Valid Data");
        } else if (!validateEmail(email)) {
            alert("your Email is inValid ");
        } else {
            //asking user for confirmation
            let con = confirm("Are You Shure You Want to Book This Car?");

            // if user confirmed
            if (con) {
                //storing the data

                bookobject = {
                    "car-id": carId,
                    "pick-up-date": pickDate,
                    "pick-up-time": pickTime,
                    "drop-date": dropDate,
                    "drop-time": dropTime,
                    "user-name": name,
                    "user-email": email,
                }
                bookedCars.push(bookobject);
                //save in local storage
                localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
                alert("You booked this car successfully 😊 ");
            }
        }



    });


    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }


}

