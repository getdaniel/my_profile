// Get the form element
const form = document.getElementById('contact_form');

// Add an event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting normally

  // Get the email and password input values
  const email = form.Email.value;
  const password = form.Password.value;

  // Sign in with email and password
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // Login successful, redirect to admin page
      window.location.href = 'admin.html';
    })
    .catch((error) => {
      // Login failed, reset form and display error message
      form.reset();
      alert(error.message);
    });
});