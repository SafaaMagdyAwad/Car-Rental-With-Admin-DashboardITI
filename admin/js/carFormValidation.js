
const form = document.getElementById("carForm");

let brand = document.getElementById("brandValidation");
let type = document.getElementById("typeValidation");
let model = document.getElementById("modelValidation");
let price = document.getElementById("priceValidation");
let availability = document.getElementById("availabilityValidation");
let category = document.getElementById("categoryValidation");
let image = document.getElementById("imageFile");
let imagePath;
let currentYear = new Date().getFullYear();

let rawCategories = localStorage.getItem("categories");
let categories = JSON.parse(rawCategories);
let rawCars = localStorage.getItem("cars");
let cars = JSON.parse(rawCars);
let carsIds = [];
cars.forEach((el) => {
    carsIds.push(el.id);
});
console.log(carsIds[carsIds.length - 1]);


window.addEventListener("load", () => {


    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    console.log(id);

    categories.forEach(element => {
        let opt = document.createElement("option");
        opt.innerText = `${element['category-title']}`;
        opt.setAttribute("value", `${element['category-title']}`);
        opt.setAttribute("id", `${element['category-title']}`);
        category.appendChild(opt);
    });
    if (id != null) {
        cars.forEach((el) => {
            //el.prand;
            if (el.id == id) {
                brand.value = el.prand;
                type.value = el.type;
                model.value = el.model;
                price.value = parseInt(el.price);
                document.getElementById("defaultAvail").removeAttribute("selected");
                document.getElementById("defaultCat").removeAttribute("selected");
                el.avilable ? document.getElementById("trueAvailable").selected = true : document.getElementById("falseAvailable").selected = true;
                document.getElementById(`${el.category}`).setAttribute("selected", "");
                imagePath = el.image;
                document.getElementById("imageHolder").setAttribute("src", `../../images/cars/${el.image}`);
                document.getElementById("imageHolder").style.display="block";
            }
        })
    }
})

image.addEventListener("change", () => {
    let temp = image.value.split("\\");
    imagePath = temp[temp.length - 1];
    document.getElementById("imageHolder").style.display="block";
    document.getElementById("imageHolder").setAttribute("src", `../../images/cars/${imagePath}`);
})


form.addEventListener('submit', event => {
    event.preventDefault();

    let flag = 1;
    let params = new URLSearchParams(location.search);
    let id = params.get("id");
    let availabilityBool;

    if (brand.value.trim() == "") {
        flag = 0;
        document.getElementById("brandValidationError").style.display = "block";
    } else {
        document.getElementById("brandValidationError").style.display = "none";
    }

    if (type.value.trim() == "") {
        flag = 0;
        document.getElementById("typeValidationError").style.display = "block";
    } else {
        document.getElementById("typeValidationError").style.display = "none";
    }

    if (model.value.trim() == "" || parseInt(model.value) > currentYear || parseInt(model.value) < 1970) {
        flag = 0;
        document.getElementById("modelValidationError").style.display = "block";
    } else {
        document.getElementById("modelValidationError").style.display = "none";
    }

    if (price.value.trim() == "" || parseInt(price.value) <= 0) {
        flag = 0;
        document.getElementById("priceValidationError").style.display = "block";
    } else {
        document.getElementById("priceValidationError").style.display = "none";
    }

    if (availability.value != "true" && availability.value != "false") {
        flag = 0;
        document.getElementById("availabilityValidationError").style.display = "block";
    } else {
        document.getElementById("availabilityValidationError").style.display = "none";
    }

    if (category.value == "") {
        flag = 0;
        document.getElementById("categoryValidationError").style.display = "block";
    } else {
        document.getElementById("categoryValidationError").style.display = "none";
    }
    if (availability.value == 'false') {
        availabilityBool = false;
    } else if (availability.value == 'true') {
        availabilityBool = true;
    }

    if (image.value == "" && imagePath == undefined) {
        flag = 0;
        document.getElementById("imageError").style.display = "block";
    } else if(image.value == ""){
        document.getElementById("imageError").style.display = "none";
    } else {
        let temp = image.value.split("\\");
        imagePath = temp[temp.length - 1];
        document.getElementById("imageError").style.display = "none";
    }


    if (flag == 1) {
        /* cars.forEach(element => {
            if(element)            
        }); */
        if (id == null) {
            cars.push(
                {
                    id: ++carsIds[carsIds.length - 1],
                    image: imagePath,
                    prand: brand.value,
                    model: model.value,
                    type: type.value,
                    price: price.value,
                    avilable: availabilityBool,
                    category: category.value
                }
            )
            localStorage.setItem("cars", JSON.stringify(cars));
            //console.log(cars);
        } else {
            cars.forEach((car) => {
                if (parseInt(id) == car.id) {
                    car.image = imagePath,
                        car.prand = brand.value,
                        car.model = model.value,
                        car.type = type.value,
                        car.price = price.value,
                        car.avilable = availabilityBool,
                        car.category = category.value
                }
            })
            localStorage.setItem("cars", JSON.stringify(cars));
        }
        window.location.replace('http://127.0.0.1:5500/admin/cars-crud.html');
        console.log(cars);


    }
});
