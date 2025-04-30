export function showCarList() {
  const raw_cars = localStorage.getItem("cars");
  let cars = JSON.parse(raw_cars);

  
  let parent = document.getElementById("cars-container");

  cars.forEach(car => {
    let div = document.createElement("div");
    div.className = "col-sm-12 col-md-4 my-2";
    let card = parent.appendChild(div);

    card.innerHTML = `
        <div class="card h-100 d-flex flex-column">
            <img src="images/cars/${car.image}" class="card-img-top" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${car.prand}</h5>
                <p class="card-text m-0"><b>Model:</b> ${car.model}</p>
                <p class="card-text m-0"><b>Type:</b> ${car.type}</p>
                <p class="card-text m-0"><b>Price:</b> ${car.price}/day</p>
                <p class="card-text m-0 ${car.avilable ? "text-success" : "text-danger"}">
                    <b>${car.avilable ? "Available" : "Not available"}</b>
                </p>
                <p class="card-text m-0 mb-2"><b>Category:</b> ${car.category}</p>
                <div class="mt-auto">
                    <a href="car-details.html?id=${car.id}&prand=${car.prand}" class="btn btn-primary text-white bg-blue w-100">Car Details</a>
                </div>
            </div>
        </div>`;
  });
}

