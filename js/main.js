import { showCarList } from "./showCarsList.js";
import { searchCar } from "./search.js";
import { filter } from "./filter.js";
import { showCategories } from "./showCategories.js";

let categories = { sportsCar: "sports", suvCar: "SUV", sedanCar: "sedan", coupeCar: "coupe", crossoverCar: "crossover" };
let raw_data = [{
    id: 1,
    image: "image.png",
    brand: "range rover",
    model: "2020",
    type: "type 1",
    price: "12LE",
    available: true,
    category: categories.crossoverCar
},
{
    id: 2,
    image: "aston.webp",
    brand: "aston martin",
    model: "2022",
    type: "DB",
    price: "1100LE",
    available: false,
    category: categories.sportsCar
}];

localStorage.setItem("cars", JSON.stringify(raw_data));
localStorage.setItem("categories", JSON.stringify(categories));

window.addEventListener("load" , ()=>{
    showCarList();
    showCategories();
    document.getElementById("search").addEventListener("click", searchCar);
    
    
    document.getElementById("filter").addEventListener("click", filter);
});


