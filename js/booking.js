document.addEventListener('DOMContentLoaded', function () {
      document.querySelectorAll(".ride-type").forEach(type => {
        type.addEventListener("click", function () {
          document.querySelectorAll(".ride-type").forEach(t => t.classList.remove("selected"));
          this.classList.add("selected");
        });
      });

      const bookingForm = document.getElementById("bookingForm");
      bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("passengerName").value.trim();
        const pickup = document.getElementById("pickup").value.trim();
        const destination = document.getElementById("destination").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const selectedType = document.querySelector(".ride-type.selected");

        if (!name || !pickup || !destination || !date || !time || !selectedType) {
          alert("Please fill all fields and select a ride type.");
          return;
        }

        const rideType = selectedType.getAttribute("data-type");
        let fare = "₹350";
        if (rideType === "Premium") fare = "₹500";
        if (rideType === "Luxury") fare = "₹800";

        document.getElementById("nameText").textContent = name;
        document.getElementById("pickupText").textContent = pickup;
        document.getElementById("dropText").textContent = destination;
        document.getElementById("dateText").textContent = date;
        document.getElementById("timeText").textContent = time;
        document.getElementById("rideTypeText").textContent = rideType;
        document.getElementById("fareText").textContent = fare;

        document.getElementById("confirmationDetails").style.display = "block";
        bookingForm.style.display = "none";
      });
    });