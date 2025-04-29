document.addEventListener("DOMContentLoaded", () => {
    let offers = JSON.parse(localStorage.getItem("offers")) || [];
    console.log(offers);
    let offersBody = document.getElementById("offersBody");

    offers.forEach(offer => {
        let row = document.createElement("tr");
        let idCol = document.createElement("td");
        idCol.innerText = offer["id"];

        let imageCol = document.createElement("td");
        let image = document.createElement("img");
        image.src = `../images/cars/${offer["image"]}`;
        image.style.width = "100px";
        image.style.height = "100px";
        imageCol.appendChild(image);
        let titleCol = document.createElement("td");
        titleCol.innerText = offer["title"];
        let discriptionCol = document.createElement("td");
        discriptionCol.innerText = offer["discription"];
        let deleteCol = document.createElement("td");
        let deletebutton = document.createElement("button");
        deletebutton.className = "btn btn-danger p-3 m-3";
        deletebutton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deletebutton.addEventListener("click", () => {
            let confirmation = confirm("are you sure you want to delete this offer?");
            // console.log(confirmation);

            if (confirmation) {
                let id = offer["id"];
                let index = offers.findIndex(o => o.id === id);
                offers.splice(index, 1);
                //delete in the ui
                let row = deletebutton.closest("tr");
                if (row) {
                    row.remove(); // Remove the row from the table
                }
                // store to localStorage
                localStorage.setItem("offers", JSON.stringify(offers));
            }
        });
        deleteCol.appendChild(deletebutton);
        row.appendChild(idCol);
        row.appendChild(imageCol);
        row.appendChild(titleCol);
        row.appendChild(discriptionCol);
        row.appendChild(deleteCol);
        offersBody.appendChild(row);
    });


});
