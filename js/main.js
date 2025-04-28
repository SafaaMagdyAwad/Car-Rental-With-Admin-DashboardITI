import { showCarList } from "./showCarsList.js";
import { searchCar } from "./search.js";
import { filter } from "./filter.js";
import { showCategories } from "./showCategories.js";




//setLocalStorage();

window.addEventListener("load" , ()=>{
    showCarList();
    showCategories();
    document.getElementById("search").addEventListener("click", searchCar);
    
    
    document.getElementById("filter").addEventListener("click", filter);
});


