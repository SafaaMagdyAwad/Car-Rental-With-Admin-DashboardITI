import { deleteCar } from "./deleteCar.js";

export function showCarsCRUD() {
    const raw_cars = localStorage.getItem("cars");
    let cars = JSON.parse(raw_cars);


    let parent = document.getElementById("tableBody");

    let i = 1;

    if(cars.length == 0){
        document.getElementById("tableParent").innerHTML = `<h1 class="text-danger text-center">No cars to be displayed</h1>`
    }
    cars.forEach(car => {
        let row = document.createElement("tr");

        let rowData = parent.appendChild(row);

        rowData.innerHTML = `
            <th scope="row">${i++}</th>
            <!-- <th scope="row">${car.id}</th> -->
            <td>${car.image}</td>
            <td>${car.prand}</td>
            <td>${car.model}</td>
            <td>${car.type}</td>
            <td>${car.price}</td>
            <td class="${car.avilable ? "text-success" : "text-danger"}">${car.avilable}</td>
            <td>${car.category}</td>
            <td>
                <a href="car-form.html?id=${car.id}"><i class="bi bi-gear-fill btn text-primary"></i></a>
                <i class="bi bi-trash-fill btn text-danger deleteCar" data-id="${car.id}"></i>
            </td>
      `;
    });

    document.querySelectorAll(".deleteCar").forEach(element =>{
        //console.log(element);
        element.addEventListener("click" , (event)=>{
            deleteCar(event.target.dataset.id);
        });
    });
}

