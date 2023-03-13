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

  // Add the new row to the table
  const messagesTable = document.querySelector('#messages-table tbody');
  messagesTable.appendChild(tableRow);
});
