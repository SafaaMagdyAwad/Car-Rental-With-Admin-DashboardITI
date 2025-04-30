export function toggleAvailability(id) {
    let confirmVal = confirm("are you sure to toggle availability for this car?");
    if (confirmVal == true) {
        let rawCars = localStorage.getItem("cars");
        let cars = JSON.parse(rawCars);
        for (let index = 0; index < cars.length; index++) {
            
            if(cars[index].id == id){
                if(cars[index].avilable == true){
                    cars[index].avilable = false;
                }else if(cars[index].avilable == false){
                    cars[index].avilable = true;
                }
            }
            
        }
        localStorage.setItem("cars" , JSON.stringify(cars));
        location.reload();
    }
}