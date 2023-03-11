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

// Reference the contact form
var contact_db = firebase.database.ref('My Personal Website');

document.getElementById("contact-form").addEventListener("submit", submit_form);

function submit_form(e) {
    e.preventDefault();

    var name = getElementVal("Name");
    var email = getElementVal("Email");
    var subject = getElementVal("Subject");
    var msg = getElementVal("Message");

    saveMessage(name, email, subject, msg);

}

const saveMessage = (name, email, subject, msg) => {
    var newContactForm = contact_db.push();

    newContactForm.set({
        name: name,
        email: email,
        subject: subject,
        message: msg
    });
}

const getElementVal = (id) => {
    return document.getElementsByName(id).value;
}