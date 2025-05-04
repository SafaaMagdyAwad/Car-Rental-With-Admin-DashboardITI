    // Get car ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id') || urlParams.get('carId');
    
    if (!carId) {
      alert('No car specified. Redirecting to homepage.');
      window.location.href = 'index.html';
    }

    // Fetch cars and bookedCars from localStorage
    const cars = JSON.parse(localStorage.getItem("cars")) || [];
    const bookedCars = JSON.parse(localStorage.getItem("bookedCars")) || [];

    // Find the specific car
    const selectedCar = cars.find(car => car.id == carId);

    // Filter bookings for this car (using loose comparison)
    const carBookings = bookedCars.filter(b => b["car-id"] == carId);

    // Render car details
    const carDetailsDiv = document.getElementById("car-details");
    if (selectedCar) {
      carDetailsDiv.innerHTML = `
        <div class="car-info">
          <img class="car-image" src="images/cars/${selectedCar.image || 'default-car.jpg'}" alt="${selectedCar.prand || selectedCar.type}">
          <div class="car-details text-lightblue p-4 text-center">
            <h3>${selectedCar.prand || selectedCar.type} ${selectedCar.model || ''}</h3>
            <p><span class="bold">Category:</span> ${selectedCar.category || 'N/A'}</p>
            <p><span class="bold">Type:</span> ${selectedCar.type || 'N/A'}</p>
            <p><span class="bold">Price:</span> ${selectedCar.price || 'N/A'}</p>
            <p><span class="bold">Availability:</span> ${selectedCar.avilable ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      `;
    } else {
      carDetailsDiv.innerHTML = `<div class="car-info"><p>No car found with ID ${carId}</p></div>`;
    }

    // Render rental history
    let BookedCars = JSON.parse(localStorage.getItem("bookedCars"))||[];

    BookedCars.forEach(book => {
      if (book["car-id"] == carId && book["status"] == "confirmed") {
          hasRental = true;
          rentalheading.innerHTML = `
                      <tr>
                          <td>
                              rented by
                          </td>
                          <td>
                              from
                          </td>
                          <td>
                              to
                          </td>
                      </tr>
          `;
          //show rental history  append elements
          let row = document.createElement("tr");
          let rentedbycol = document.createElement("td");
          rentedbycol.innerText = book["user-name"]
          let fromcol = document.createElement("td");
          fromcol.innerText = `${book["pick-up-date"]}  ,${book["pick-up-time"]}`;
          let tocol = document.createElement("td");
          tocol.innerText = `${book["drop-date"]}  ,${book["drop-time"]}`;
          row.appendChild(rentedbycol);
          row.appendChild(fromcol);
          row.appendChild(tocol);
          renthistory.appendChild(row);
      }

  });
  if (!hasRental) {
      rentalheading.innerHTML = `
          <div class="card text-bg-warning mb-3" style="max-width: 100vw;">
              <div class="card-header"> No requests </div>
              <div class="card-body">
                  <p class="card-text">this car has no rental requests yet</p>
              </div>
          </div>`;
  }

    // Helper functions for date formatting
    function formatDate(dateString) {
      if (!dateString) return 'N/A';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function formatDateTime(dateTimeString) {
      if (!dateTimeString) return 'N/A';
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateTimeString).toLocaleDateString(undefined, options);
    }