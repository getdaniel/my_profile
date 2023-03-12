// Get a reference to the Firebase authentication
var auth = firebase.auth();

document.getElementById("contact_form").addEventListener("submit", function(event) {
    event.preventDefault();

    var email = document.getElementsByName("Email")[0].value;
    var password = document.getElementsByName("Password")[0].value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Successful login
        var user = userCredential.user;
        console.log(user.uid);
        // User is authenticated, redirect to admin page
        window.location.href = "admin.html";
    })
    .catch((error) => {
        // Login error
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});