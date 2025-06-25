
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const signInForm = document.getElementById('signin');
  const signUpForm = document.getElementById('signup');

  // Handle Signup Form Submission
  signupForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent traditional form submission

      const fullName = document.getElementById('Fullname').value;
      const email = document.getElementById('email-signup').value; // Signup email field
      const password = document.getElementById('password-signup').value; // Signup password field

      // Simple form validation for signup
      if (fullName && email && password) {
          try {
              const response = await fetch('/signup', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      fullName,
                      email,
                      password
                  }),
              });

              if (response.ok) {
                  const result = await response.json();
                  showNotification(result.message);
                  signupForm.reset(); // Clear the signup form
                  signInForm.style.display = "block";
                  signUpForm.style.display = "none";
              } else {
                  const error = await response.text();
                  showNotification(error); 
              }
          } catch (error) {
              showNotification('Error during signup');
          }
      } else {
          showNotification('Please fill in all the fields correctly.');
      }
  });

  // Handle Login Form Submission
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent traditional form submission

      const email = document.getElementById('email').value; // Login email field
      const password = document.getElementById('password').value; // Login password field

      // Simple form validation for login
      if (email.trim() && password.trim()) {
          try {
              const response = await fetch('/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      email,
                      password
                  }),
              });

              if (response.ok) {
                  const result = await response.json();
                  showNotification(result.message);  // Success notification
                  window.location.href = 'home.html'; // Redirect to home page after successful login
              } else {
                  const error = await response.text();
                  showNotification(error);  // Error notification
              }
          } catch (error) {
              showNotification('Error during login');
          }
      } else {
          // Show error message only if both fields are empty or invalid
          showNotification('Please enter both email and password.');
      }
  });

  // Switch between Signup and Login forms
  const submitsignup = document.getElementById('submitsignup');
  const submitsignin = document.getElementById('submitsignin');

  submitsignup.addEventListener('click', function() {
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
  });

  submitsignin.addEventListener('click', function() {
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
  });

  // Function to show browser notification
  function showNotification(message) {
      if (Notification.permission === "granted") {
          new Notification(message); // Show notification
      } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                  new Notification(message); // Show notification
              }
          });
      }
  }
});
login.js

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const signInForm = document.getElementById('signin');
  const signUpForm = document.getElementById('signup');

  // Handle Signup Form Submission
  signupForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent traditional form submission

      const fullName = document.getElementById('Fullname').value;
      const email = document.getElementById('email-signup').value; // Signup email field
      const password = document.getElementById('password-signup').value; // Signup password field

      // Simple form validation for signup
      if (fullName && email && password) {
          try {
              const response = await fetch('/signup', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      fullName,
                      email,
                      password
                  }),
              });

              if (response.ok) {
                  const result = await response.json();
                  showNotification(result.message);
                  signupForm.reset(); // Clear the signup form
                  signInForm.style.display = "block";
                  signUpForm.style.display = "none";
              } else {
                  const error = await response.text();
                  showNotification(error); 
              }
          } catch (error) {
              showNotification('Error during signup');
          }
      } else {
          showNotification('Please fill in all the fields correctly.');
      }
  });

  // Handle Login Form Submission
  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent traditional form submission

      const email = document.getElementById('email').value; // Login email field
      const password = document.getElementById('password').value; // Login password field

      // Simple form validation for login
      if (email.trim() && password.trim()) {
          try {
              const response = await fetch('/login', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      email,
                      password
                  }),
              });

              if (response.ok) {
                  const result = await response.json();
                  showNotification(result.message);  // Success notification
                  window.location.href = 'home.html'; // Redirect to home page after successful login
              } else {
                  const error = await response.text();
                  showNotification(error);  // Error notification
              }
          } catch (error) {
              showNotification('Error during login');
          }
      } else {
          // Show error message only if both fields are empty or invalid
          showNotification('Please enter both email and password.');
      }
  });

  // Switch between Signup and Login forms
  const submitsignup = document.getElementById('submitsignup');
  const submitsignin = document.getElementById('submitsignin');

  submitsignup.addEventListener('click', function() {
      signInForm.style.display = "none";
      signUpForm.style.display = "block";
  });

  submitsignin.addEventListener('click', function() {
      signInForm.style.display = "block";
      signUpForm.style.display = "none";
  });

  // Function to show browser notification
  function showNotification(message) {
    
      if (Notification.permission === "granted") {
          new Notification(message); // Show notification
      } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then(permission => {
              if (permission === "granted") {
                  new Notification(message); // Show notification
              }
          });
      }
  }
});
