export function filter() {
    let valid = new Set();


    let availableCond = document.getElementById("availability").checked;
    let rawCatCond = document.querySelectorAll(".cat");
    let catCond = [...rawCatCond].filter(element => element.checked).map((element) => element.value);

    let to500 = document.getElementById("to500").checked;
    let to1000 = document.getElementById("to1000").checked;
    let from1000 = document.getElementById("from1000").checked;
    /* let rawPriceCond = document.querySelectorAll(".price");
    let priceCond = [...rawPriceCond].filter(element => element.checked).map((element) => element.value); */
    //console.log([...filters]);
    //let conds = [...filters].filter((element) => element.checked);
    //console.log(conds);
    let cars = JSON.parse(localStorage.getItem("cars"));
    /*  cars.forEach((element)=>{
         if(car)
     }); */

    if (availableCond) {
        cars.forEach((element) => {
            if (element.available == true) {
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
            if (parseInt(element.price) <= 1000) {
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
    console.log("----", valid);
    console.log("****", catCond);

    let parent = document.getElementById("cars-container");
    if (valid.size <= 0) {
        /* let div = document.createElement("div");
        div.className = "col-sm-12 col-md-4 col-lg-3 my-2";
        let card = parent.appendChild(div);
        card.innerHTML = `<div class="text-danger">Not found in cars list</div>`; */
        document.getElementById("filterError").style.display = "block";
    }else{
        parent.innerHTML = '';
        document.getElementById("filterError").style.display = "none";
    }
    valid.forEach(car => {
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