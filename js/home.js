document.addEventListener("DOMContentLoaded", () => {
  let offers = JSON.parse(localStorage.getItem("offers")) || [];
  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let cars = JSON.parse(localStorage.getItem("cars")) || [];
  

  if (offers.length === 0) {
    offers = [
      {
        id: 1,
        carId:1,
        image: "car (6).jpg",
        title: "30% Off - SUV Rentals",
        discription:
          "Rent a premium SUV this weekend and get 30% off. Perfect for road trips and family getaways.",
      },
      {
        id: 2,
        carId:1,
        image: "car (6).jpg",
        title: "30% Off - SUV Rentals",
        discription:
          "Rent a premium SUV this weekend and get 30% off. Perfect for road trips and family getaways.",
      },
      {
        id: 3,
        carId:1,
        image: "car (6).jpg",
        title: "30% Off - SUV Rentals",
        discription:
          "Rent a premium SUV this weekend and get 30% off. Perfect for road trips and family getaways.",
      },
      {
        id: 4,
        carId:1,
        image: "car (6).jpg",
        title: "30% Off - SUV Rentals",
        discription:
          "Rent a premium SUV this weekend and get 30% off. Perfect for road trips and family getaways.",
      },
    ];
    localStorage.setItem("offers", JSON.stringify(offers));
  }
  if (categories.length === 0) {
    categories = [
      {
        id: 1,
        "category-title": "Sports Car",
        image: "sports car.jpg",
      },
      {
        id: 2,
        "category-title": "Convertible",
        image: "Convertible car.jpg",
      },
      {
        id: 3,
        "category-title": "Coupe",
        image: "Coupe car.jpg",
      },
      {
        id: 4,
        "category-title": "Sedan",
        image: "Sedan car.jpg",
      },
      {
        id: 5,
        "category-title": "SUV",
        image: "SUV car.jpg",
      },
      {
        id: 4,
        "category-title": "Jeep",
        image: "jeep car.jpg",
      },
    ];
    localStorage.setItem("categories", JSON.stringify(categories));
  }
  console.log(categories)

//   feature section
if (cars.length === 0) {
    cars = [
      {
        id: 1,
        image: "toyota2.avif",
        prand: "Tesla Model Y",
        model: "2020",
        type: "toyota",
        price: "12LE",
        avilable: true,
        category: `${categories[0]["category-title"]}`,
      },

      {
        id: 2,
        image: "frod.avif",
        prand: "Ford Kombi",
        model: "2010",
        type: "van",
        price: "13LE",
        avilable: true,
        category: `${categories[1]["category-title"]}`,
      },

      {
        id: 3,
        image: "tesla.avif",
        prand: "Suzuki Swift Hybrid or similar",
        model: "2020",
        type: "toyota",
        price: "14LE",
        avilable: true,
        category: `${categories[3]["category-title"]}`,
      },
      {
        id: 4,
        image: "toyota.avif",
        prand: "Toyota",
        model: "2020",
        type: "toyota",
        price: "15LE",
        avilable: true,
        category: `${categories[4]["category-title"]}`,
      },
    ];

    localStorage.setItem("cars", JSON.stringify(cars));
  }

let featuredCardbutton =document.querySelectorAll(".featuredCardbutton");
let featuredCardTitles =document.querySelectorAll(".featuredCardTitle");
let featuredCardTypeSpans=document.querySelectorAll(".featuredCardTypeSpan");
let featuredCardPriceSpans=document.querySelectorAll(".featuredCardPriceSpan");
let featuredCardCategorySpans=document.querySelectorAll(".featuredCardCategorySpan");
let featuredCardModelSpans=document.querySelectorAll(".featuredCardModelSpan");
let featuredCardImages=document.querySelectorAll(".featuredCardImage");


featuredCardbutton.forEach((featuredCardbutton , index)=> {
    
  featuredCardbutton.href= `car-details.html?id=${cars[index].id}`;
    
});
featuredCardImages.forEach((featuredCardImage , index)=> {
    
    featuredCardImage.src= `images/cars/${cars[index].image}`;
    
});
featuredCardTitles.forEach((featuredCardTitle , index)=> {
    
    featuredCardTitle.innerHTML=cars[index].prand;
    
});
featuredCardPriceSpans.forEach((featuredCardPriceSpan , index)=> {
    
    featuredCardPriceSpan.innerHTML=cars[index].price;
    
});

featuredCardModelSpans.forEach((featuredCardModelSpan , index)=> {
    
    featuredCardModelSpan.innerHTML=cars[index].model;
    
});
featuredCardTypeSpans.forEach((featuredCardTypeSpan , index)=> {
    
    featuredCardTypeSpan.innerHTML=cars[index].type;
    
});
featuredCardCategorySpans.forEach((featuredCardCategorySpan , index)=> {
    
    featuredCardCategorySpan.innerHTML=cars[index].category;
    
});









  const offersContainer = document.getElementById("offers-container");
  const categoriesContainer = document.getElementById("categories-container");
  offers.forEach((offer) => {
    const col = document.createElement("div");
    if (offers.length == 1) {
      col.className = `col-lg-12 col-md-12 col-sm-12`;
    } else if (offers.length == 2) {
        col.className = `col-lg-6 col-md-5 col-sm-12`;
    } else {
      col.className = `col-lg-4 col-md-6 col-sm-12`;
    }

    col.innerHTML = `
                <div class="card shadow p-3 mb-5 mb-5 bg-body-tertiary rounded animation" style="height:100%">
                    <img src="images/cars/${offer.image}"  height="300px" width="100%"  class="card-img-top" alt="${offer.title}">
                    <div class="card-body">
                        <h3 class="card-title text-darkblue">${offer.title}</h3>
                        <p class="card-text text-lightblue">${offer.discription}</p>
                        <span class="badge bg-danger mb-2">Limited Time 🕗  </span><br>
                        <a href="car-details.html?id=${offer.carId}" class="btn btn-primary">Book Now 📖 </a>
                    </div>
                </div>
            `;

    offersContainer.appendChild(col);
  });

  categories.forEach((category) => {
    const col = document.createElement("div");
    if (categories.length == 1) {
      col.className = "col-lg-12 col-md-12 col-sm-12";
    } else if (categories.length == 2) {
      if (category.id == 1) {
        col.className = `col-lg-4 col-md-5 col-sm-12`;
      } else {
        col.className = `col-lg-8 col-md-7 col-sm-12`;
      }
    } else {
      col.className = "col-lg-4 col-md-6 col-sm-12";
    }

    col.innerHTML = `
            <div class="card shadow p-3  bg-ofwhite border-cofee rounded animation" style="height:100%">
                <img src="images/categories/${category.image}" height="300px" width="100%"  class="card-img-top" alt="${category["category-title"]}">
                <div class="card-body">
                    <h3 class="card-title text-lightblue">${category["category-title"]}</h3>
                    <a href="car-list.html" class="btn btn-primary mt-4">Explore more 🌟 </a>
                </div>
            </div>
        `;
    categoriesContainer.appendChild(col);
  });
});
