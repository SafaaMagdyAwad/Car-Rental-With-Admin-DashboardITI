import { showRentRequests } from "./showRentRequests.js";
import { deleteBookingReq } from "./deleteBookingReq.js";
import { confirmBookingReq } from "./confirmBookingReq.js";
import { checkDropDate } from "./checkDropDate.js";

window.addEventListener("load", () => {
    const bookedCarsRaw = localStorage.getItem("bookedCars");
    let bookedCars = JSON.parse(bookedCarsRaw);

    let rawCars = localStorage.getItem("cars");
    let cars = JSON.parse(rawCars);

    console.log("*****",cars);
    //console.log(bookedCars);
    checkDropDate(bookedCars , cars);
    console.log("-----",cars);
    showRentRequests(bookedCars, cars);

    document.querySelectorAll(".deleteReq").forEach(element => {
        //console.log(element);
        element.addEventListener("click", (event) => {
            deleteBookingReq(event.target.dataset.carid, event.target.dataset.useremail, bookedCars);
        });
    });
    document.querySelectorAll(".confirmReq").forEach(element => {
        //console.log(element);
        element.addEventListener("click", (event) => {
            confirmBookingReq(event.target.dataset.carid, event.target.dataset.useremail, bookedCars, cars , event.target.dataset.rentid);
        });
    });
})