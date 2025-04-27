let bookedCars = JSON.parse(localStorage.getItem("bookedCars")) || [];
let modal = `
     <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Booking Car 🚙 </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="container pt-4 border-cofee shadow rounded text-center bg-light text-darkblue p-5  mt-5" id="book">
                <h2 class="p-5">Want to Book This Car 😃 </h2>
                <p>Tell me When do you need it </p>
                <form class="needs-validation" novalidate>
                    <div class="row row-gap-3">
                        <div class="col-md-4 col-sm-12">
                            <label for="">From</label>
                        </div>
                        <div class="col-md-8 col-sm-12">
                            <div class="input-group">
                                <input type="date" name="" id="pickDate" class="form-control" required>
                                <div class="invalid-feedback">Please choose a valid date.</div>
                                <input type="time" name="" id="pickTime" class="form-control" required>
                                <div class="invalid-feedback">Please choose a valid time.</div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 ">
                            <label for="">To</label>
                        </div>
                        <div class="col-md-8 col-sm-12">
                            <div class="input-group">
                                <input type="date" name="" id="dropDate" class="form-control" required>
                                <div class="invalid-feedback">Please choose a valid date.</div>
                                <input type="time" name="" id="dropTime" class="form-control" required>
                                <div class="invalid-feedback">Please choose a valid time.</div>
                            </div>
                        </div>
                    <p>now i need to know your contact info ℹ </p>
                        <div class="col-md-4 col-sm-12 ">
                            <label for="">Your Name</label>
                        </div>
                        <div class="col-md-8 col-sm-12">
                            <div class="input-group">
                                <input type="text" name="" id="name" class="form-control" required>
                                <div class="invalid-feedback">Please Write Your Name</div>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-12 ">
                            <label for="">Your Email</label>
                        </div>
                        <div class="col-md-8 col-sm-12">
                            <div class="input-group">
                                <input type="email" name="" id="email" class="form-control" required>
                                <div class="invalid-feedback">Please Write Your Email</div>
                            </div>
                        </div>
                        <button type="submit" id="submitbooking" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  </div>
`;


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

    if (car.avilable) {
        // Append the modal only once when car is available
        if (!document.getElementById("exampleModal")) {
            document.body.insertAdjacentHTML('beforeend', modal);
        }
        let button = document.createElement("button");
        button.className = "form-control btn btn-primary pt-2 pb-2";
        button.type = "button";
        button.setAttribute("data-bs-toggle", "modal");
        button.setAttribute("data-bs-target", "#exampleModal");
        button.innerText = "Book Now 🎉 !";
        cardbody.appendChild(button);

    } else {

        let button1 = document.createElement("button");
        button1.className = "form-control btn btn-danger pt-2 pb-2";
        button1.innerText = "This Car is not avilable right now 😥";
        cardbody.appendChild(button1);
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

