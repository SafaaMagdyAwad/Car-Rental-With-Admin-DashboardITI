let reviews = JSON.parse(localStorage.getItem("reviews")) || [];



let reviewsContainer = document.getElementById("reviewsContainer");
if (reviews.length == 0) {
    let table = document.getElementById("table");
    table.innerHTML = `<div class="card text-bg-warning mb-3" style="max-width: 100vw;">
            <div class="card-header"> No requests </div>
            <div class="card-body">
                <p class="card-text">there is no reviews yet</p>
            </div>
        </div>`;
} else {
    reviews.forEach(review => {
        let row = document.createElement("tr");
        let idcell = document.createElement("td");
        idcell.innerText = review.id;
        let commentcell = document.createElement("td");
        commentcell.innerText = review.comment;
        let starcell = document.createElement("td");
        let text = ``;
        for (let i = 0; i < review.stars; i++) {
            text += `<i class="bi bi-star-fill"></i>`;
        };
        starcell.innerHTML = text;
        starcell.className = "text-warning";
        let ishiddencell = document.createElement("td");
        if (review["is-hidden"]) {
            ishiddencell.innerHTML = `<i class="bi bi-eye-slash"></i>`;
        } else {
            ishiddencell.innerHTML = `<i class="bi bi-eye-fill"></i>`;
        }
        let usernamecell = document.createElement("td");
        usernamecell.innerText = review["user-name"];
        let createdatcell = document.createElement("td");
        createdatcell.innerHTML = review["created-at"];
        let togglebuttoncell = document.createElement("button");
        togglebuttoncell.innerHTML = `<i class="bi bi-toggles2"></i>`;
        togglebuttoncell.addEventListener("click", () => {
            if (review["is-hidden"]) {
                review["is-hidden"] = false;
                // store in localStorage
                localStorage.setItem("reviews", JSON.stringify(reviews));
                ishiddencell.innerHTML = `<i class="bi bi-eye-fill"></i>`;
            } else {
                review["is-hidden"] = true;
                // store in localStorage
                localStorage.setItem("reviews", JSON.stringify(reviews));
                ishiddencell.innerHTML = `<i class="bi bi-eye-slash"></i>`;
            }
        });
        togglebuttoncell.className = "btn btn-success mt-2 ";

        let deletebuttoncell = document.createElement("button");
        deletebuttoncell.innerHTML = `<i class="bi bi-trash"></i>`;
        deletebuttoncell.addEventListener("click", () => {
            let con = confirm("Are you sure to delete this Review");
            if (con) {
                const index = reviews.findIndex(revi => revi.id === review.id);
                if (index !== -1) {
                    reviews.splice(index, 1);
                }
                //delete from the ui
                let row = deletebuttoncell.closest("tr");
                if (row) {
                    row.remove(); // Remove the row from the table
                }
                localStorage.setItem("reviews", JSON.stringify(reviews));
            }
        });
        deletebuttoncell.className = "btn btn-danger mt-2 ";

        row.appendChild(idcell);
        row.appendChild(commentcell);
        row.appendChild(starcell);
        row.appendChild(ishiddencell);
        row.appendChild(usernamecell);
        row.appendChild(createdatcell);
        row.appendChild(togglebuttoncell);
        row.appendChild(deletebuttoncell);
        reviewsContainer.appendChild(row);
    });
}



