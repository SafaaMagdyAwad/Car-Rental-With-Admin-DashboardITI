export function deleteCar(id) {
    let confirmVal = confirm("are you sure to delete this car?");
    let requestedCars = JSON.parse(localStorage.getItem("bookedCars"));
    let currentdate = new Date();
    let confirmedCars = requestedCars.filter((el)=>{
        let elDate = new Date(el['drop-date'] + ":" + el['drop-time']);
        return (el.status == "confirmed" && elDate > currentdate);
    });
    let confirmedCarsIds = [];
    confirmedCars.forEach(element => {
        confirmedCarsIds.push(element['car-id']);
    });
    if (confirmVal == true) {
        let rawCars = localStorage.getItem("cars");
        let cars = JSON.parse(rawCars);
        for (let index = 0; index < cars.length; index++) {
            
            if(cars[index].id == id && !(confirmedCarsIds.includes(id))){
                cars.splice(index , 1);
            }else if(cars[index].id == id && confirmedCarsIds.includes(id)){
                alert("this car can not be deleted");
            }
            
        }
        localStorage.setItem("cars" , JSON.stringify(cars));
        location.reload();
    }
}