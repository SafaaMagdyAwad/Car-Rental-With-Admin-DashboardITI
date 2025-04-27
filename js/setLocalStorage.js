export function setLocalStorage() {
  let categories = [
    { id: 1, "category-title": "Sports Car", image: "sports car.jpg" },
    { id: 2, "category-title": "Convertible", image: "Convertible car.jpg" },
    { id: 3, "category-title": "Coupe", image: "Coupe car.jpg" },
    { id: 4, "category-title": "Sedan", image: "Sedan car.jpg" },
    { id: 5, "category-title": "SUV", image: "SUV car.jpg" },
    { id: 6, "category-title": "Jeep", image: "jeep car.jpg" },
  ];

  let raw_data = [
    { id: 1, image: "toyota2.avif", prand: "Tesla Model Y", model: "2020", type: "toyota", price: "12LE", avilable: true, category: categories[0]["category-title"] },
    { id: 2, image: "frod.avif", prand: "Ford Kombi", model: "2010", type: "van", price: "13LE", avilable: true, category: categories[1]["category-title"] },
    { id: 3, image: "tesla.avif", prand: "Suzuki Swift Hybrid or similar", model: "2020", type: "toyota", price: "14LE", avilable: true, category: categories[3]["category-title"] },
    { id: 4, image: "toyota.avif", prand: "Toyota", model: "2020", type: "toyota", price: "15LE", avilable: true, category: categories[4]["category-title"] },
  ];

  localStorage.setItem("cars", JSON.stringify(raw_data));
  localStorage.setItem("categories", JSON.stringify(categories));
}

document.addEventListener('DOMContentLoaded', function () {
  // Set cars and categories
  setLocalStorage();

  // Check if admins array exists in localStorage
  if (!localStorage.getItem('admins')) {
    const admins = [
      { id: 1, name: "Ahmed Mohamed", email: "ahmed@carrental.com", password: "Ahmed@123", role: "Superadmin", createdAt: new Date().toISOString() },
      { id: 2, name: "Mariam Khalid", email: "mariam@carrental.com", password: "Mariam@123", role: "admin", createdAt: new Date().toISOString() },
      { id: 3, name: "Ali Hassan", email: "ali@carrental.com", password: "Ali@12345", role: "admin", createdAt: new Date().toISOString() },
      { id: 4, name: "Sara Abdullah", email: "sara@carrental.com", password: "Sara@123", role: "admin", createdAt: new Date().toISOString() },
      { id: 5, name: "Khaled Ibrahim", email: "khaled@carrental.com", password: "Khaled@123", role: "admin", createdAt: new Date().toISOString() },
      { id: 6, name: "Nora Saad", email: "nora@carrental.com", password: "Nora@1234", role: "admin", createdAt: new Date().toISOString() }
    ];

    localStorage.setItem('admins', JSON.stringify(admins));
  }
});
