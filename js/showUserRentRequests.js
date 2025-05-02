window.addEventListener("load" , ()=>{
    //debugger;
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get("email");

    const bookedCars = JSON.parse(localStorage.getItem("bookedCars"));
    const cars = JSON.parse(localStorage.getItem("cars"));
    let userRequested = bookedCars.filter((el)=>{
        return el['user-email'] == userEmail;
    })
    let isConfirmed = false;
    let isPending = false;

    let holderElement = document.getElementById("elementsHolder");
    holderElement.innerHTML ='';
    if (userRequested.length > 0) {
        userRequested.forEach(element => {
            let tempCar = cars.find((el)=>{
                return el.id == element['car-id'];
            })
            
            if (element.status == "confirmed") {
                isConfirmed = true;
            }else if(element.status == "pending"){
                isPending = true;
            }
            holderElement.innerHTML += `
                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="../../images/cars/${tempCar.image}" class="img-fluid h-100 object-fit-cover rounded" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title"><b>${element['prand']}</b></h5>
                                    <p class="card-text my-1 text-start ms-2"><b>Status:</b> ${element['status']}</p>
                                    <p class="card-text my-1 text-start ms-2"><b>Car Model:</b> ${tempCar.model}</small></p>
                                    <p class="card-text my-1 text-start ms-2"><b>Picking date:</b> ${element['pick-up-date']} <b>at</b> ${element['pick-up-time']}</p>
                                    <p class="card-text my-1 text-start ms-2"><b>Dropping date:</b> ${element['drop-date']} <b>at</b> ${element['drop-time']}</p>
                                    <p class="card-text my-1 text-start ms-2"><b>Status: <span class="${isConfirmed ? "text-success" : ""} ${isPending ? "text-warning" : ""}">${element.status}</span></b></p>
                                    
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>

            `
        });
    }else{
        holderElement.innerHTML = `<div style="height: 60vh" class="d-flex justify-content-center align-items-center"s><h1><b>You did not requested any car</b></h1></div>`;
    }
})