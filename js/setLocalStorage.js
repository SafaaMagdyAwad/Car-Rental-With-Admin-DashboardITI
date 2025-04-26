export function setLocalStorage(){
    let categories = [
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
    let raw_data = [
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
    
    localStorage.setItem("cars", JSON.stringify(raw_data));
    localStorage.setItem("categories", JSON.stringify(categories));
}