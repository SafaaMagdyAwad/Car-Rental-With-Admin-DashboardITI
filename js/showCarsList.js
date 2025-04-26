export function showCarList() {
    const raw_cars = localStorage.getItem("cars");
    let cars = JSON.parse(raw_cars);
    const raw_categories = localStorage.getItem("categories");
    let categories = JSON.parse(raw_categories);

    console.log(cars);
    let parent = document.getElementById("cars-container");

    cars.forEach(car => {
        let div = document.createElement("div");
        div.className = "col-sm-12 col-md-4 col-lg-3 my-2";
        let card = parent.appendChild(div);
        card.innerHTML = `
                <div class="card" style="height:auto;">
                
                <img src="../images/cars/${car.image}" class="card-img-top " style="height: 200px;">
                <div class="card-body">
                  <h5 class="card-title text-center">${car.brand}</h5>
                  <p class="card-text m-0"><b>model:</b> ${car.model}</p>
                  <p class="card-text m-0"><b>type:</b> ${car.type}</p>
                  <p class="card-text m-0"><b>price:</b> ${car.price}/day</p>
                  <p class="card-text m-0 ${car.available ? "text-success" : "text-danger"}"> <b>${car.available ? "available" : "not available"}</b> </p>
                  <p class="card-text m-0 mb-2"><b>category:</b> ${car.category}</p>
                  <div class="text-center mx-auto">
                    <a href="#" class="btn btn-primary ">car details</a>
                  </div>
                </div>
                </div>`;
    });
}