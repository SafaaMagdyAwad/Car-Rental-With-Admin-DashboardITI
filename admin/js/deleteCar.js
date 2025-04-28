export function deleteCar(id) {
    let confirmVal = confirm("are you sure to delete this car?");
    if (confirmVal == true) {
        let rawCars = localStorage.getItem("cars");
        let cars = JSON.parse(rawCars);
        for (let index = 0; index < cars.length; index++) {
            
            if(cars[index].id == id){
                cars.splice(index , 1);
            }
            
        }
        localStorage.setItem("cars" , JSON.stringify(cars));
        location.reload();
    }
}