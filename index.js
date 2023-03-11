// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrL_A052MByKBsPO7M4oJ-WPf1QIf1ASA",
    authDomain: "my-profile-371308.firebaseapp.com",
    databaseURL: "https://my-profile-371308-default-rtdb.firebaseio.com",
    projectId: "my-profile-371308",
    storageBucket: "my-profile-371308.appspot.com",
    messagingSenderId: "42986837237",
    appId: "1:42986837237:web:d50c3bb7a50631da2a61bc",
    measurementId: "G-S535EY51Y3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// const app = initializeApp(firebaseConfig);

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
  })
  .catch(function(error) {
    // If there was an error saving the data to the database, show an error message
    alert("There was an error sending your message. Please try again later.");
  });
});