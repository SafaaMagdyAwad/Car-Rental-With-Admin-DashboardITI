const params = new URLSearchParams(window.location.search);
const carId = params.get("id");
let offers = JSON.parse(localStorage.getItem("offers")) || [];
let car = {};
// console.log(carId);

let cars = JSON.parse(localStorage.getItem("cars")) || [];
console.log(cars);

cars.forEach(acar => {
    if (acar["id"] == carId) {
        car = acar;
    }
});
console.log(car);
if (Object.keys(car).length !== 0) {
    let carDetails = document.getElementById("carDetails");
    let card = document.createElement("div");
    card.className = "card mb-3";
    carDetails.appendChild(card);
    let image = document.createElement("img");
    image.src = `../images/cars/${car["image"]}`;
    image.className = "card-img-top img-fluid";
    card.appendChild(image);
    let cardbody = document.createElement("div");
    cardbody.className = "card-body";
    card.appendChild(cardbody);
    let elemnts = ["prand", "model", "type", "price", "category"];
    for (let i = 0; i < elemnts.length; i++) {
        let inf = document.createElement("p");
        inf.className = "ps-5 text-success";
        inf.innerText = `${elemnts[i]} : ${car[elemnts[i]]}`;
        cardbody.appendChild(inf);
    };

    let rentalheading = document.getElementById("rentalheading");
    let renthistory = document.getElementById("renthistory");
    let BookedCars = JSON.parse(localStorage.getItem("bookedCars"))||[];
    let hasRental = false;
    console.log(BookedCars);
    if(BookedCars.length==0){
        rentalheading.innerHTML = `
        <div class="card text-bg-warning mb-3" style="max-width: 100vw;">
            <div class="card-header"> No requests </div>
            <div class="card-body">
                <p class="card-text">this car has no rental requests yet</p>
            </div>
        </div>`;
    }else{

        BookedCars.forEach(book => {
            if (book["car-id"] == carId && book["status"] == "confirmed") {
                hasRental = true;
                rentalheading.innerHTML = `
                            <tr>
                                <td>
                                    rented by
                                </td>
                                <td>
                                    from
                                </td>
                                <td>
                                    to
                                </td>
                            </tr>
                `;
                //show rental history  append elements
                let row = document.createElement("tr");
                let rentedbycol = document.createElement("td");
                rentedbycol.innerText = book["user-name"]
                let fromcol = document.createElement("td");
                fromcol.innerText = `${book["pick-up-date"]}  ,${book["pick-up-time"]}`;
                let tocol = document.createElement("td");
                tocol.innerText = `${book["drop-date"]}  ,${book["drop-time"]}`;
                row.appendChild(rentedbycol);
                row.appendChild(fromcol);
                row.appendChild(tocol);
                renthistory.appendChild(row);
            }
    
        });
        if (!hasRental) {
            rentalheading.innerHTML = `
                <div class="card text-bg-warning mb-3" style="max-width: 100vw;">
                    <div class="card-header"> No requests </div>
                    <div class="card-body">
                        <p class="card-text">this car has no rental requests yet</p>
                    </div>
                </div>`;
        }
    }
} else {

    
    page.innerHTML = `
        <div class="card text-bg-warning mb-3" style="max-width: 100vw;">
            <div class="card-header">some thig went wrong</div>
            <div class="card-body">
                <p class="card-text">This car is not stored into the system</p>
            </div>
        </div>
    `;
}





let submitoffer = document.getElementById("submitoffer");

submitoffer.addEventListener("click", (e) => {

    e.preventDefault();
    console.log("im in submit offer");
    let title = document.getElementById("title").value;
    let discription = document.getElementById("discription").value;
    //validation

    if (!title || !discription) {
        alert("Please Enter Valid Data");
    } else {


        //storing the data
        let offerobject = {
            "id": offers.length,
            "car-id": carId,
            "image": car['image'],
            "title": title,
            "discription": discription,
        }
        offers.push(offerobject);
        //save in local storage
        localStorage.setItem("offers", JSON.stringify(offers));
        alert("Your offer was addes successfully😊 ");

    }
});

