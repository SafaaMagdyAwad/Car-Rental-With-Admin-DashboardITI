export function deleteCar(id) {
    let confirmVal = confirm("are you sure to delete this car?");
    let requestedCars = JSON.parse(localStorage.getItem("bookedCars"));
    let currentdate = new Date();
    let confirmedCars = requestedCars.filter((el)=>{
        let elDate = new Date(el['drop-date'] + ":" + el['drop-time']);
        return (el.status == "confirmed" && elDate > currentdate);
    });
    let offers=JSON.parse(localStorage.getItem("offers"))||[];
    let confirmedCarsIds = [];
    confirmedCars.forEach(element => {
        confirmedCarsIds.push(element['car-id']);
    });
    let offeredCarsIds = [];
    offers.forEach(offer => {
        // console.log(offer['carId']);
        // debugger
        offeredCarsIds.push(JSON.stringify(offer['carId']));
    });
    // console.log(confirmedCarsIds);
    // console.log(offeredCarsIds);
    // debugger
    if (confirmVal == true) {
        let rawCars = localStorage.getItem("cars");
        let cars = JSON.parse(rawCars);
        for (let index = 0; index < cars.length; index++) {
            if(cars[index].id == id ){
                if( confirmedCarsIds.includes(id) ){
                    alert("this car has a rental request now Cant be deleted");
                    
                }else if(offeredCarsIds.includes(id)){
                    alert("this car has an offer can not be deleted");
                }else{
                    
                    cars.splice(index , 1);
                    localStorage.setItem("cars" , JSON.stringify(cars));
                }
            }
            
        }
        location.reload();
    }
}