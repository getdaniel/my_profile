// Get a reference to the Firebase Realtime Database
var database = firebase.database();


// Get a reference to the contact form
var contactForm = document.getElementById("contact_form");

// Add an event listener to the contact form to listen for form submissions
contactForm.addEventListener("submit", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values from the contact form
  var name = contactForm.querySelector("[name='Name']").value;
  var email = contactForm.querySelector("[name='Email']").value;
  var subject = contactForm.querySelector("[name='Subject']").value;
  var message = contactForm.querySelector("[name='Message']").value;

  // Save the user's input to the Firebase Realtime Database
  database.ref('messages').push({
    name: name,
    email: email,
    subject: subject,
    message: message
  })
  .then(function() {
    // If the data was saved to the database successfully, show a success message
    alert("Your message was sent successfully!");

    contactForm.reset();
  })
  .catch(function() {
    // If there was an error saving the data to the database, show an error message
    alert("There was an error sending your message. Please try again later.");
  });
});