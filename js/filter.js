export function filter() {
    let valid = new Set();


    let availableCond = document.getElementById("availability").checked;

    let rawCatCond = document.querySelectorAll(".cat");
    let catCond = [...rawCatCond].filter(element => element.checked).map((element) => element.value);

    let to500 = document.getElementById("to500").checked;
    let to1000 = document.getElementById("to1000").checked;
    let from1000 = document.getElementById("from1000").checked;

    let filterElements = [ ...document.querySelectorAll(".filter")].filter(element => element.checked);
    
    let cars = JSON.parse(localStorage.getItem("cars"));
    

    if (filterElements.length <= 0) {
        document.getElementById("filterError").style.display = "block";
    }


    if (availableCond) {
        cars.forEach((element) => {
            if (element.avilable == true) {
                valid.add(element);
            }
        })
    }
    cars.forEach((element) => {
        if (catCond.includes(element.category)) {
            valid.add(element);
        }
    });

    if (to500) {
        
        cars.forEach((element) => {
            if (parseInt(element.price) <= 500) {
                valid.add(element);
            }
        })
    }
    if (to1000) {
        cars.forEach((element) => {
            if (parseInt(element.price) > 500 && parseInt(element.price) <= 1000) {
                valid.add(element);
            }
        })
    }
    if (from1000) {
        
        cars.forEach((element) => {
            if (parseInt(element.price) > 1000) {
                valid.add(element);
            }
        })
    }

    let parent = document.getElementById("cars-container");
        


    if (valid.size <= 0) {

        document.getElementById("filterError").style.display = "block";
        document.getElementById("filterError").innerText = "No valid cars!";

    }else{

        parent.innerHTML = '';
        document.getElementById("filterError").style.display = "none";
        
    }


    valid.forEach(car => {
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
                        <a href="#" class="btn btn-primary text-white bg-blue w-100">Car Details</a>
                    </div>
                </div>
            </div>`;
    });

    if (filterElements.length == 0) {
        window.location.reload();
    }

}