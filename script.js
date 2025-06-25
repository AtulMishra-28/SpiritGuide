// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
  
    // Add click event listener to the button
    startButton.addEventListener("click", () => {
      window.location.href = "dashboard.html"; // Redirect to the login page
    });
  });