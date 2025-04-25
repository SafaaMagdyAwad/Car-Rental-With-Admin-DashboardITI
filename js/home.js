document.addEventListener("DOMContentLoaded", () => {
    let offers = JSON.parse(localStorage.getItem("offers")) || [];
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    if (offers.length === 0) {
        offers = [
            {
                "id": 1,
                "image": "car (6).jpg",
                "title": "30% Off - SUV Rentals",
                "discription": "Rent a premium SUV this weekend and get 30% off. Perfect for road trips and family getaways.",
            },
            // {
            //     "id": 2,
            //     "image": "car (5).jpg",
            //     "title": "35% Off - SUV Rentals",
            //     "discription": "Get 35% off on select SUV rentals this week only!"
            // },
            // {
            //     "id": 3,
            //     "image": "car (4).jpg",
            //     "title": "35% Off - SUV Rentals",
            //     "discription": "Get 35% off on select SUV rentals this week only!"
            // }
        ];
        localStorage.setItem("offers", JSON.stringify(offers));
    }
    if (categories.length === 0) {
        categories = [
            {
                "id":1,
                "category-title":"Sports Car",
                "image":"sports car.jpg",
            },
            {
                "id":2,
                "category-title":"Convertible",
                "image":"Convertible car.jpg",
            }, 
            {
                "id":3,
                "category-title":"Coupe",
                "image":"Coupe car.jpg",
            }, 
            {
                "id":4,
                "category-title":"Sedan",
                "image":"Sedan car.jpg",
            }, 
            {
                "id":5,
                "category-title":"SUV",
                "image":"SUV car.jpg",
            }, 
            {
                "id":4,
                "category-title":"Jeep",
                "image":"jeep car.jpg",
            }, 
            
        ];
        localStorage.setItem("categories", JSON.stringify(categories));
    }
    const offersContainer = document.getElementById("offers-container");
    const categoriesContainer = document.getElementById("categories-container");
    offers.forEach(offer => {
        const col = document.createElement("div");
        if(offers.length==1){
            col.className = `col-lg-12 col-md-12 col-sm-12`;
        }else if(offers.length==2){
            if(offer.id==1){
                col.className = `col-lg-4 col-md-5 col-sm-12`;
            }else{
                col.className = `col-lg-8 col-md-7 col-sm-12`;
            }
        }else{
            col.className = `col-lg-4 col-md-6 col-sm-12`;
        }

            col.innerHTML = `
                <div class="card shadow p-3 mb-5 mb-5 bg-body-tertiary rounded animation" style="height:100%">
                    <img src="../images/cars/${offer.image}"  height="300px" width="100%"  class="card-img-top" alt="${offer.title}">
                    <div class="card-body">
                        <h3 class="card-title text-darkblue">${offer.title}</h3>
                        <p class="card-text text-lightblue">${offer.discription}</p>
                        <span class="badge bg-danger mb-2">Limited Time 🕗  </span><br>
                        <a href="#" class="btn btn-primary">Book Now 📖 </a>
                    </div>
                </div>
            `;
        
        offersContainer.appendChild(col);
    });
   
    categories.forEach(category => {
        const col = document.createElement("div");
        if(categories.length==1){
            col.className = "col-lg-12 col-md-12 col-sm-12";
        }else if(categories.length==2){
            if(category.id==1){
                col.className = `col-lg-4 col-md-5 col-sm-12`;
            }else{
                col.className = `col-lg-8 col-md-7 col-sm-12`;
            }
        }else{
            col.className = "col-lg-4 col-md-6 col-sm-12";
        }

        col.innerHTML = `
            <div class="card shadow p-3  bg-ofwhite border-cofee rounded animation" style="height:100%">
                <img src="../images/categories/${category.image}" height="300px" width="100%"  class="card-img-top" alt="${category["category-title"]}">
                <div class="card-body">
                    <h3 class="card-title text-lightblue">${category["category-title"]}</h3>
                    <a href="#" class="btn btn-primary mt-4">Explore more 🌟 </a>
                </div>
            </div>
        `;
        categoriesContainer.appendChild(col);
    });
});
