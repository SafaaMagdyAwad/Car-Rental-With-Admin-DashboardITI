// Check if users array exists in localStorage
if (!localStorage.getItem("users")) {
    const users = [
      {
        id: 1,
        name: "Ahmed Mohamed",
        email: "ahmed@carrental.com",
        password: "Ahmed@123",
        role: "user",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Mariam Khalid",
        email: "mariam@carrental.com",
        password: "Mariam@123",
        role: "user",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Ali Hassan",
        email: "ali@carrental.com",
        password: "Ali@12345",
        role: "user",
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Sara Abdullah",
        email: "sara@carrental.com",
        password: "Sara@123",
        role: "user",
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: "Khaled Ibrahim",
        email: "khaled@carrental.com",
        password: "Khaled@123",
        role: "user",
        createdAt: new Date().toISOString(),
      },
      
    ];
  
    localStorage.setItem("users", JSON.stringify(users));
  }
let admins;
let cars;
let users;
if (localStorage.getItem("admins") && localStorage.getItem("cars") && localStorage.getItem("users")) {
    admins = JSON.parse(localStorage.getItem("admins"));
    cars = JSON.parse(localStorage.getItem("cars"));
    users = JSON.parse(localStorage.getItem("users"));

}else
{
    console.log("no data in local storage");
    
}
let bookedCars = JSON.parse(localStorage.getItem("bookedCars"));
console.log(bookedCars);

let bookobject = {
    "car-id": 100000,
    "pick-up-date": 0,
    "pick-up-time": 0,
    "drop-date": 0,
    "drop-time": 0,
    "user-name": "eman",
    "user-email": "user.email",
    "status": "confirmed",
    "prand": "Tesla ",
}
let bookobject2 = {
    "car-id": 200000,
    "pick-up-date": 0,
    "pick-up-time": 0,
    "drop-date": 0,
    "drop-time": 0,
    "user-name": "eman",
    "user-email": "user.email",
    "status": "confirmed",
    "prand": "Ford ",
}
// bookedCars.push(bookobject2);
// localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
// bookedCars.push(bookobject);
// localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
// bookedCars.push(bookobject);
// localStorage.setItem("bookedCars", JSON.stringify(bookedCars));





let numOfRentedCars = 0;
bookedCars.forEach((bookedCar , index) => {
    if (bookedCar.status == "confirmed") {
        numOfRentedCars = numOfRentedCars + 1;
    }
    
});

let num_admins = document.getElementById("num_admins");
let num_cars = document.getElementById("num_cars");
let num_users = document.getElementById("num_users");
let num_rented = document.getElementById("num_rented");

num_admins.innerHTML= `${admins.length} admin`;
num_cars.innerHTML =`${cars.length} car`;
num_users.innerHTML =`${users.length} user`;
num_rented.innerHTML =`${numOfRentedCars} car`;


// chart

const labels = [];
cars.forEach(car => {
    let prand = car.prand;
    let car_name;
    if (prand.includes(" ")) {
        car_name = prand.split(" ")[0];
      } else {
        car_name = str.substring(0, 6);
      }

    labels.push(car_name);
});


// define num of times each  car  has been booked
let countsOfBookedCars = {};
bookedCars.forEach(function(car) {
  if (countsOfBookedCars[car.prand]) {
    countsOfBookedCars[car.prand]++;
  } else {
    countsOfBookedCars[car.prand] = 1;
  }
});
let dataOfBookedCars = Object.values(countsOfBookedCars);

// define num of times each  car  has been rented
let countsOfRentedCars = {};
bookedCars.forEach(function(car) {
  if (countsOfRentedCars[car.prand] && car.status == "confirmed") {
    countsOfRentedCars[car.prand]++;
  } else if (!(car.prand in countsOfRentedCars)  && car.status == "confirmed") {
    countsOfRentedCars[car.prand] = 1;
  }
});
let dataOfRentedCars = Object.values(countsOfRentedCars);


    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Booked Cars',
          data: dataOfBookedCars,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          barThickness: 30
        },
        {
          label: 'Rented Cars',
          data: dataOfRentedCars,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          barThickness: 30
        }
      ]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        animations: {  
          bar: {
            delay: function(context) {
              let datasetLabel = context.chart.data.datasets[context.datasetIndex].label;
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default') {
                if (datasetLabel === 'Booked Cars') {
                  delay = context.dataIndex * 300;
                } else if (datasetLabel === 'Rented Cars') {
                  delay = context.dataIndex * 500;
                }
              }
              return delay;
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );

