document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.querySelector('.nav');
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // Ride type selection
  document.querySelectorAll(".ride-type").forEach((type) => {
    type.addEventListener("click", function () {
      document.querySelectorAll(".ride-type").forEach(t => t.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Booking form submission
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("passengerName").value.trim();
      const pickup = document.getElementById("pickup").value.trim();
      const destination = document.getElementById("destination").value.trim();
      const date = document.getElementById("date").value;
      const time = document.getElementById("time").value;
      const selectedType = document.querySelector(".ride-type.selected");
      const rideType = selectedType ? selectedType.getAttribute("data-type") : null;
      if (!name || !pickup || !destination || !date || !time || !rideType) {
        alert("Please fill all fields and select a ride type.");
        return;
      }
      const fare = "₹350";
      localStorage.setItem("name", name);
      localStorage.setItem("pickup", pickup);
      localStorage.setItem("destination", destination);
      localStorage.setItem("date", date);
      localStorage.setItem("time", time);
      localStorage.setItem("rideType", rideType);
      localStorage.setItem("fare", fare);
      window.location.href = "confirmation.html";
    });
  }

  // Confirmation page display
  if (window.location.pathname.includes("confirmation.html")) {
    document.getElementById("nameText").textContent = localStorage.getItem("name") || "--";
    document.getElementById("pickupText").textContent = localStorage.getItem("pickup") || "--";
    document.getElementById("dropText").textContent = localStorage.getItem("destination") || "--";
    document.getElementById("dateText").textContent = localStorage.getItem("date") || "--";
    document.getElementById("timeText").textContent = localStorage.getItem("time") || "--";
    document.getElementById("rideTypeText").textContent = localStorage.getItem("rideType") || "--";
    document.getElementById("fareText").textContent = localStorage.getItem("fare") || "--";
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Driver booking button
  document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function () {
      const driverName = this.closest('.driver-card').querySelector('h3').textContent;
      alert(`Redirecting to booking page for ${driverName}`);
    });
  });

  // Auth modal handling
  const openLogin = document.getElementById("openLogin");
  const openSignup = document.getElementById("openSignup");
  const authModal = document.getElementById("authModal");
  const closeModal = document.getElementById("closeModal");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const switchToSignup = document.getElementById("switchToSignup");
  const switchToLogin = document.getElementById("switchToLogin");
  const authOverlay = document.querySelector(".auth-overlay");

  // ✅ Also grab .login-btn and .signup-btn (for home page buttons)
  const homeLoginBtn = document.querySelector(".login-btn");
  const homeSignupBtn = document.querySelector(".signup-btn");

  // Show Login Modal
  if (openLogin) openLogin.addEventListener("click", showLoginModal);
  if (homeLoginBtn) homeLoginBtn.addEventListener("click", showLoginModal);

  function showLoginModal(e) {
    e.preventDefault();
    authModal.classList.add("active");
    document.body.classList.add("modal-blur");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  }

  // Show Signup Modal
  if (openSignup) openSignup.addEventListener("click", showSignupModal);
  if (homeSignupBtn) homeSignupBtn.addEventListener("click", showSignupModal);

  function showSignupModal(e) {
    e.preventDefault();
    authModal.classList.add("active");
    document.body.classList.add("modal-blur");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }

  // Close Modal
  if (closeModal) closeModal.addEventListener("click", closeAuthModal);

  // Close when clicking overlay
  if (authOverlay) authOverlay.addEventListener("click", closeAuthModal);

  function closeAuthModal() {
    authModal.classList.remove("active");
    document.body.classList.remove("modal-blur");
  }

  // Switch to Signup inside modal
  if (switchToSignup) switchToSignup.addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  // Switch to Login inside modal
  if (switchToLogin) switchToLogin.addEventListener("click", e => {
    e.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Standalone login/signup (for rating.html etc.)
  const standaloneLoginForm = document.querySelector("form#loginForm");
  if (standaloneLoginForm && !authModal) standaloneLoginForm.addEventListener("submit", e => {
    e.preventDefault(); alert("Login successful!");
  });

  const standaloneSignupForm = document.querySelector("form#signupForm");
  if (standaloneSignupForm && !authModal) standaloneSignupForm.addEventListener("submit", e => {
    e.preventDefault(); alert("Signup successful!");
  });

  // ⭐ Show Ratings & Star Rating
  const showRatingsBtn = document.getElementById("showRatingsBtn");
  const ratingSection = document.getElementById("ratingSection");

  if (showRatingsBtn && ratingSection) {
    showRatingsBtn.addEventListener("click", () => {
      ratingSection.classList.remove("hidden");
      showRatingsBtn.style.display = "none";

      const starContainers = ratingSection.querySelectorAll('.stars');
      starContainers.forEach(container => {
        const driverName = container.getAttribute('data-driver');
        container.textContent = '';

        for (let i = 1; i <= 5; i++) {
          const span = document.createElement('span');
          span.textContent = '★';
          span.dataset.index = i;
          span.style.color = '#ccc';
          span.style.cursor = 'pointer';

          span.addEventListener('click', () => {
            highlightStars(container, i);
            saveRating(driverName, i);
            const msg = document.getElementById('thanksMessage');
            if (msg) {
              msg.classList.remove('hidden');
              setTimeout(() => msg.classList.add('hidden'), 2000);
            }
          });

          container.appendChild(span);
        }
      });
    });
  }

  function highlightStars(container, rating) {
    const stars = container.querySelectorAll('span');
    stars.forEach((star, idx) => {
      star.style.color = idx < rating ? '#f5b301' : '#ccc';
    });
  }

  function saveRating(driver, stars) {
    const ratings = JSON.parse(localStorage.getItem("driverRatings") || "{}");
    ratings[driver] = stars;
    localStorage.setItem("driverRatings", JSON.stringify(ratings));
  }

  // 🔒 Password validation for login & signup
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      const password = this.querySelector('input[type="password"]').value;
      if (!passwordPattern.test(password)) {
        e.preventDefault();
        alert("Password must be at least 8 characters, include 1 number and 1 special symbol.");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      const password = this.querySelector('input[type="password"]').value;
      if (!passwordPattern.test(password)) {
        e.preventDefault();
        alert("Password must be at least 8 characters, include 1 number and 1 special symbol.");
      }
    });
  }
});

