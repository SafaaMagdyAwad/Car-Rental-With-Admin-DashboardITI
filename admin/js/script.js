// Check if users array exists in localStorage
// if (!localStorage.getItem("users")) {
//     const users = [
//       {
//         id: 1,
//         name: "Ahmed Mohamed",
//         email: "ahmed@carrental.com",
//         password: "Ahmed@123",
//         role: "user",
//         createdAt: new Date().toISOString(),
//       },
//       {
//         id: 2,
//         name: "Mariam Khalid",
//         email: "mariam@carrental.com",
//         password: "Mariam@123",
//         role: "user",
//         createdAt: new Date().toISOString(),
//       },
//       {
//         id: 3,
//         name: "Ali Hassan",
//         email: "ali@carrental.com",
//         password: "Ali@12345",
//         role: "user",
//         createdAt: new Date().toISOString(),
//       },
//       {
//         id: 4,
//         name: "Sara Abdullah",
//         email: "sara@carrental.com",
//         password: "Sara@123",
//         role: "user",
//         createdAt: new Date().toISOString(),
//       },
//       {
//         id: 5,
//         name: "Khaled Ibrahim",
//         email: "khaled@carrental.com",
//         password: "Khaled@123",
//         role: "user",
//         createdAt: new Date().toISOString(),
//       },
      
//     ];
  
//     localStorage.setItem("users", JSON.stringify(users));
//   }
let admins;
let cars;
let users;
if (localStorage.getItem("admins") || localStorage.getItem("cars") || localStorage.getItem("users")) {
    admins = JSON.parse(localStorage.getItem("admins"));
    cars = JSON.parse(localStorage.getItem("cars"));
    users = JSON.parse(localStorage.getItem("users"))||[];

}else
{
  alert("no data in local storage")
    
}
let num_admins = document.getElementById("num_admins");
let num_cars = document.getElementById("num_cars");
let num_users = document.getElementById("num_users");
let num_rented = document.getElementById("num_rented");

num_admins.innerHTML= `${admins.length} admin`;
num_cars.innerHTML =`${cars.length} car`;
num_users.innerHTML =`${users.length} user`;






let bookedCars ;
let numOfRentedCars = 0;

// chart labels

const labels = [];
let car_name;
cars.forEach(car => {
    let prand = car.prand;
    
    if (prand.includes(" ")) {
        car_name = prand.split(" ")[0];
      } else {
        car_name = prand.substring(0, 6);
      }

    labels.push(car_name);
});

// check if there are booked cars and display the char
if (!(JSON.parse(localStorage.getItem("bookedCars")))) {
  num_rented.innerHTML =`${numOfRentedCars} car`;

  // display the chart when there is no booked car
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Booked Cars',
        data: [0],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        barThickness: 30
      },
      {
        label: 'Rented Cars',
        data: [0],
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
  
} else {
  bookedCars = JSON.parse(localStorage.getItem("bookedCars"));

  // define num of times each  car  has been booked and its status is  pending
  let countsOfeachBookedCar ={};
  let countsOfRentedCars = {};
  bookedCars.forEach((bookedCar , index) => {
    if (bookedCar.status == "confirmed") {
        numOfRentedCars = numOfRentedCars + 1;
    }  
  num_rented.innerHTML =`${numOfRentedCars} car`;

    let splited_prand = bookedCar.prand.split(" ")[0] ;
  
    if ( bookedCar.status == "pending") {
     if (countsOfeachBookedCar[splited_prand]) {
      countsOfeachBookedCar[splited_prand]=countsOfeachBookedCar[splited_prand]+1;
      
     } else {
      countsOfeachBookedCar[splited_prand]= 1
   
     }
    } else if( bookedCar.status == "confirmed") {
        if (countsOfRentedCars[splited_prand]) {
          countsOfRentedCars[splited_prand]=countsOfRentedCars[splited_prand]+1;
          
        } else {
          countsOfRentedCars[splited_prand]= 1
      
        }
      
    }
});
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Booked Cars',
        data: countsOfeachBookedCar,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        barThickness: 30
      },
      {
        label: 'Rented Cars',
        data: countsOfRentedCars,
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

}

// define num of times each  car  has been booked and its status is  pending
let countsOfeachBookedCar ={};
let countsOfRentedCars = {};
bookedCars.forEach(bookedCar => {

  let splited_prand = bookedCar.prand.split(" ")[0] ;
  
  if ( bookedCar.status == "pending") {
   if (countsOfeachBookedCar[splited_prand]) {
    countsOfeachBookedCar[splited_prand]=countsOfeachBookedCar[splited_prand]+1;
    
   } else {
    countsOfeachBookedCar[splited_prand]= 1
 
   }
  } else if( bookedCar.status == "confirmed") {
      if (countsOfRentedCars[splited_prand]) {
        countsOfRentedCars[splited_prand]=countsOfRentedCars[splited_prand]+1;
        
      } else {
        countsOfRentedCars[splited_prand]= 1
    
      }
    
  }
  
}
);


// localStorage.removeItem("bookedCars");