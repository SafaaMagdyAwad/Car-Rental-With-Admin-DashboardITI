const config = {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Sep','Oct','Nov','Dec'],
        datasets: [{
            label: 'My Data',
            data: yearlyRent(),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true // To fill the area under the line
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'My Custom Line Chart'
            }
        }
    }
};

const ctx = document.getElementById('yearReport');
const yearReport = new Chart(ctx, config);



function yearlyRent() {
    let bookedCars = JSON.parse(localStorage.getItem("bookedCars")) || [];
    let carsbermonth=[0,0,0,0,0,0,0,0,0,0,0,0];
    // console.log(bookedCars);
    bookedCars.forEach(book => {
        /// if book.status=confirmed
        if (book["status"] == "confirmed") {
            let date=new Date(book["pick-up-date"]);
            console.log(date.getMonth());
            carsbermonth[date.getMonth()]++;
            // if(book["pick-up-date"].get)
        }

    });
    return carsbermonth;
}


