export function searchCar() {
    let searchVal = document.getElementById("searchField").value;
    if (searchVal == "") {
        document.getElementById("searchError").style.display = "block";
    } else {
        document.getElementById("searchError").style.display = "none";
        const raw_cars = localStorage.getItem("cars");
        let cars = JSON.parse(raw_cars);
        let validCar = cars.filter((car) => car.brand.includes(searchVal));
        console.log(validCar);
        let parent = document.getElementById("cars-container");
        parent.innerHTML = '';
        if(validCar.length <= 0){
            let div = document.createElement("div");
            div.className = "col-sm-12 col-md-4 col-lg-3 my-2";
            let card = parent.appendChild(div);
            card.innerHTML = `<div class="text-danger">Not found in cars list</div>`;
        }
        validCar.forEach(car => {
            let div = document.createElement("div");
            div.className = "col-sm-12 col-md-4 col-lg-3 my-2";
            let card = parent.appendChild(div);
            card.innerHTML = `
                <div class="card">
                
                <img src="../images/cars/${car.image}" class="card-img-top mb-2" style="height: 200px;">
                <div class="card-body">
                  <h5 class="card-title text-center">${car.brand}</h5>
                  <p class="card-text">model: ${car.model}</p>
                  <p class="card-text">type: ${car.type}</p>
                  <p class="card-text">price: ${car.price}/day</p>
                  <p class="card-text">${car.available ? "available" : "not available"}</p>
                  <p class="card-text">category: ${car.category}</p>
                  <div class="text-center">
                    <a href="#" class="btn btn-primary ">Go somewhere</a>
                  </div>
                </div>
                </div>`;
        });
    }
}