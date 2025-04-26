export function searchCar() {
    let searchVal = document.getElementById("searchField").value;

    if (searchVal == "") {
        
        document.getElementById("searchError").style.display = "block";

    } else {

        document.getElementById("searchError").style.display = "none";
        const raw_cars = localStorage.getItem("cars");
        let cars = JSON.parse(raw_cars);

        let validCar = cars.filter((car) => {
            console.log(typeof (car.prand));
            let carName = car.prand.toLowerCase();
            return carName.includes(searchVal.toLowerCase())
        });
        
        let parent = document.getElementById("cars-container");
        parent.innerHTML = '';


        if (validCar.length <= 0) {
            let div = document.createElement("div");
            div.className = "col-sm-12 col-md-4 col-lg-3 my-2";
            let card = parent.appendChild(div);
            card.innerHTML = `<div class="text-danger">Not found in cars list</div>`;
        }

        
        validCar.forEach(car => {
            let div = document.createElement("div");
            div.className = "col-sm-12 col-md-4 my-2";
            let card = parent.appendChild(div);
            card.innerHTML = `
                <div class="card h-100 d-flex flex-column">
                    <img src="../images/cars/${car.image}" class="card-img-top" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${car.prand}</h5>
                        <p class="card-text m-0"><b>Model:</b> ${car.model}</p>
                        <p class="card-text m-0"><b>Type:</b> ${car.type}</p>
                        <p class="card-text m-0"><b>Price:</b> ${car.price}/day</p>
                        <p class="card-text m-0 ${car.available ? "text-success" : "text-danger"}">
                            <b>${car.available ? "Available" : "Not available"}</b>
                        </p>
                        <p class="card-text m-0 mb-2"><b>Category:</b> ${car.category}</p>
                        <div class="mt-auto mx-auto">
                            <a href="#" class="btn btn-primary text-white bg-blue">Car Details</a>
                        </div>
                    </div>
                </div>`;
        });
    }
}