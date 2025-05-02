export function confirmBookingReq(carId, userEmail, bookedCars, cars, rentId) {
    // debugger;
    let cond = confirm("are you sure you want to confirm this request?");
    let confirmedCars;
    let tempIndex;

    //change request status to confirm
    if (cond == true) {
        for (let index = 0; index < bookedCars.length; index++) { // id for rent should be added 
            //if (bookedCars[index]['car-id'] == carId && bookedCars[index]['user-email'] == userEmail) {
            if (bookedCars[index]['rent-id'] == rentId) {
                bookedCars[index].status = "confirmed";
                tempIndex = index;
            }
        }
    } else {
        return;
    }

    //change car availability
    cars.forEach(element => {
        if (element.id == carId && element.avilable == true) {
            element.avilable = false;
            localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
            localStorage.setItem("cars", JSON.stringify(cars));
            location.reload();
        } else if ((element.id == carId && element.avilable == false)) {//handling that rent request may be made by two users
            bookedCars[tempIndex].status = "pending";
            alert("the car has been confirmed to another req");
        }
    });


}