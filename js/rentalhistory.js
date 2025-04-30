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
          <div class="car-details">
            <h3>${selectedCar.prand || selectedCar.type} ${selectedCar.model || ''}</h3>
            <p><span class="bold">Category:</span> ${selectedCar.category || 'N/A'}</p>
            <p><span class="bold">Type:</span> ${selectedCar.type || 'N/A'}</p>
            <p><span class="bold">Price:</span> ${selectedCar.price || 'N/A'}</p>
            <p><span class="bold">Availability:</span> ${selectedCar.available ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      `;
    } else {
      carDetailsDiv.innerHTML = `<div class="car-info"><p>No car found with ID ${carId}</p></div>`;
    }

    // Render rental history
    const historyContainer = document.getElementById("history-container");
    if (carBookings.length > 0) {
      carBookings.forEach(booking => {
        historyContainer.innerHTML += `
          <div class="history-entry">
            <p><span class="bold">Pick-up Date:</span> ${formatDate(booking["pick-up-date"])} at ${booking["pick-up-time"] || 'N/A'}</p>
            <p><span class="bold">Drop-off Date:</span> ${formatDate(booking["drop-date"])} at ${booking["drop-time"] || 'N/A'}</p>
            <p><span class="bold">Booked At:</span> ${formatDateTime(booking["created-at"])}</p>
          </div>
        `;
      });
    } else {
      historyContainer.innerHTML = `<div class="history-entry"><p>No rental history found for this car.</p></div>`;
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