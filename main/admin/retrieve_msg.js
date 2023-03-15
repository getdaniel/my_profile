// Variable declaration

// Get a reference to the messages in the database
const messagesRef = firebase.database().ref('messages');
var messages = null;
var tableRow = null;
var nameCell = null;
var emailCell = null;
var subjectCell = null;
var messageCell = null;
var replyButtonCell = null;
var replyButton = null;
var sendButton = null
var deleteButtonCell = null;
var deleteButton = null;
var messagesTable = null;
var toEmail = null;
var replyModal = null;
var subject = null;
var message = null;
var xhr = null;

// Attach a listener to the messages reference to receive updates when new messages are added
messagesRef.on('child_added', snapshot => {
  // Get the message data from the snapshot
  messages = snapshot.val();

  // Create a new row in the table
  tableRow = document.createElement('tr');

  // Create a cell for the name
  nameCell = document.createElement('td');
  nameCell.textContent = messages.name;
  tableRow.appendChild(nameCell);

  // Create a cell for the email
  emailCell = document.createElement('td');
  emailCell.textContent = messages.email;
  tableRow.appendChild(emailCell);

  // Create a cell for the subject
  subjectCell = document.createElement('td');
  subjectCell.textContent = messages.subject;
  tableRow.appendChild(subjectCell);

  // Create a cell for the message
  messageCell = document.createElement('td');
  messageCell.textContent = messages.message;
  tableRow.appendChild(messageCell);

  // Create a cell for the reply button
  replyButtonCell = document.createElement('td');
  replyButton = document.createElement('button');
  replyButton.textContent = 'Reply';
  replyButton.classList.add('btn', 'btn-primary');
  replyButtonCell.appendChild(replyButton);
  tableRow.appendChild(replyButtonCell);

  // Create a cell for the delete button
  deleteButtonCell = document.createElement('td');
  deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButtonCell.appendChild(deleteButton);
  tableRow.appendChild(deleteButtonCell);

  // Add the new row to the table
  messagesTable = document.querySelector('#messages-table tbody');
  messagesTable.appendChild(tableRow);
   
  // Add a click listener to the reply button
  replyButton.addEventListener('click', () => {
    // Get the email address of the person who sent the message
    toEmail = messages.email;

    // Open the reply modal
    replyModal = document.querySelector('#reply-modal');
    replyModal.style.display = 'block';

    // Add a click listener to the send button in the reply modal
    sendButton = document.querySelector('#send-reply-btn');
    sendButton.addEventListener('click', () => {
      // Get the subject and message of the reply
      subject = document.querySelector('#reply-subject').value;
      message = document.querySelector('#reply-message').value;

      // Send the reply email
      xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://us-central1-my-profile-371308.cloudfunctions.net/sendEmail', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          alert('Reply sent!');
          replyModal.style.display = 'none';
        }
      };
      xhr.send(JSON.stringify({
        toEmail: toEmail,
        subject: subject,
        message: message
      }));
    });
    // Get the X button in the reply modal
    const closeButton = document.querySelector('#reply-modal .close');

    // Add an onclick event listener to hide the modal when the X button is clicked
    closeButton.addEventListener('click', () => {
      replyModal.style.display = 'none';
    });
  });

  // Add a click listener to the delete button
  deleteButton.addEventListener('click', () => {
    // Remove the message from the database
    messagesRef.child(snapshot.key).remove();

    // Remove the message row from the table
    messagesTable.removeChild(tableRow);
  });
});