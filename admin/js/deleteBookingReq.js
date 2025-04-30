export function deleteBookingReq(carId, userEmail, bookedCars) {
    debugger;
    let cond = confirm("are you sure you want to delete this request?");
    if (cond == true) {
        for (let index = 0; index < bookedCars.length; index++) { // id for rent should be added 
            if (bookedCars[index]['car-id'] == carId && bookedCars[index]['user-email'] == userEmail) {
                bookedCars.splice(index, 1);
            }
        }
    }
    localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
    location.reload();

}