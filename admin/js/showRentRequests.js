/* {
    "car-id": carId,
    "pick-up-date": pickDate,
    "pick-up-time": pickTime,
    "drop-date": dropDate,
    "drop-time": dropTime,
    "user-name": user.name,
    "user-email": user.email,
    "status": "pending",
} */


/* 
    car-id
    : 
    "2"
    drop-date
    : 
    "2025-04-30"
    drop-time
    : 
    "21:30"
    pick-up-date
    : 
    "2025-04-29"
    pick-up-time
    : 
    "19:29"
    status
    : 
    "pending"
    user-email
    : 
    "ahmed@carrental.com"
    user-name
    : 
    "Ahmed Mohamed"
 */
export function showRentRequests(bookedCars, cars) {
    //let test = document.getElementById("test");
    let parent = document.getElementById("requestsHolder");

    //handling if no requests 
    if (bookedCars == undefined || bookedCars.length == 0) {
        parent.innerHTML = `<h1 class="text-danger"><b>No Rent Requests</b><h1>`;
    } else {
        //show all booked cars
        bookedCars.forEach(element => {
            console.log(element);

            //code to get wanted car
            let car;
            cars.forEach(el => {
                if (el.id == element['car-id']) {
                    car = el;
                }
            })
            //wanted car returned

            //holding status
            let isPending;
            let isConfirmed;
            let isFinished;
            if (element.status == "pending") {
                isPending = true;
            } else if (element.status == "confirmed") {
                isConfirmed = true;
            }else if(element.status == "finished"){
                isFinished = true;
            }

            console.log(car);
            let card = document.createElement("div");
            card.classList.add("col-12");
            card.innerHTML = `<div class="card mb-3" ${isFinished ? 'style="opacity:0.6;"' : ""}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="../../images/cars/${car.image}" class="img-fluid h-100 object-fit-cover rounded" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title"><b>${car.prand}</b></h5>
                                    <p class="card-text my-1 text-start ms-2"><b>Requested by:</b> ${element['user-name']}</p>
                                    <p class="card-text my-1 text-start ms-2"><b>User email:</b> <small>${element['user-email']}</small></p>
                                    <p class="card-text my-1 text-start ms-2"><b>Picking date:</b> ${element['pick-up-date']} <b>at</b> ${element['pick-up-time']}</p>
                                    <p class="card-text my-1 text-start ms-2"><b>Dropping date:</b> ${element['drop-date']} <b>at</b> ${element['drop-time']}</p>
                                    <p class="card-text my-1 text-start ms-2"><b>Status: <span class="${isConfirmed ? "text-success" : ""} ${isPending ? "text-warning" : ""}">${element.status}</span></b></p>
                                    ${isPending ? `<div class="mb-0 p-0 border-top" id="rentControllers">
                                    <i class="bi bi-check-square-fill btn text-success fs-5 confirmReq" data-carId="${element['car-id']}" data-userEmail="${element['user-email']}" data-rentid="${element['rent-id']}"></i>
                                    <i class="bi bi-x-circle-fill btn text-danger fs-5 deleteReq" data-carId="${element['car-id']}" data-userEmail="${element['user-email']}"></i>
                                    </div>` : ""}
                                    
                                </div>
                            </div>
                        </div>
                    </div>`;
            parent.appendChild(card);

        });
    }
    ;
}