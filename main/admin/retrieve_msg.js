// Get a reference to the messages in the database
const messagesRef = firebase.database().ref('messages');

// Attach a listener to the messages reference to receive updates when new messages are added
messagesRef.on('child_added', snapshot => {
  // Get the message data from the snapshot
  const message = snapshot.val();

  // Create a new row in the table
  const tableRow = document.createElement('tr');

  // Create a cell for the name
  const nameCell = document.createElement('td');
  nameCell.textContent = message.name;
  tableRow.appendChild(nameCell);

  // Create a cell for the email
  const emailCell = document.createElement('td');
  emailCell.textContent = message.email;
  tableRow.appendChild(emailCell);

  // Create a cell for the subject
  const subjectCell = document.createElement('td');
  subjectCell.textContent = message.subject;
  tableRow.appendChild(subjectCell);

  // Create a cell for the message
  const messageCell = document.createElement('td');
  messageCell.textContent = message.message;
  tableRow.appendChild(messageCell);

  // Create a cell for the reply button
  const replyButtonCell = document.createElement('td');
  const replyButton = document.createElement('button');
  replyButton.textContent = 'Reply';
  replyButton.classList.add('btn', 'btn-primary');
  replyButtonCell.appendChild(replyButton);
  tableRow.appendChild(replyButtonCell);

  // Create a cell for the delete button
  const deleteButtonCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButtonCell.appendChild(deleteButton);
  tableRow.appendChild(deleteButtonCell);

  // Add the new row to the table
  const messagesTable = document.querySelector('#messages-table tbody');
  messagesTable.appendChild(tableRow);

  // Add a click listener to the reply button
  replyButton.addEventListener('click', () => {
    // Get the email address of the person who sent the message
    const toEmail = message.email;

    // Open the reply modal
    const replyModal = document.querySelector('#reply-modal');
    replyModal.style.display = 'block';

    // Add a click listener to the send button in the reply modal
    const sendButton = document.querySelector('#send-reply');
    sendButton.addEventListener('click', () => {
      // Get the subject and message of the reply
      const subject = document.querySelector('#reply-subject').value;
      const message = document.querySelector('#reply-message').value;

      // Send the reply email
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://us-central1-your-project-id.cloudfunctions.net/sendEmail', true);
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
  });

  // Add a click listener to the delete button
  deleteButton.addEventListener('click', () => {
    // Remove the message from the database
    messagesRef.child(snapshot.key).remove();

    // Remove the message row from the table
    messagesTable.removeChild(tableRow);
  });
});