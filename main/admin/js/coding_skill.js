// Define a reference to the 'coding-skills'.
const codingDb = firebase.database().ref('coding-skills');

// Get references to the relevant HTML elements
const codingTableBody = document.querySelector('#coding-skills-table tbody');
const languageInput = document.querySelector('#language-input');
const percentageInput = document.querySelector('#percentage-input');
const codingAddButton = document.querySelector('#add-coding-skill-button');
const codingUpdateButton = document.querySelector('#update-coding-skill-button');
const codingCancelButton = document.querySelector('#cancel-coding-skill-button');

// Add an event listener to the 'Add' button
codingAddButton.addEventListener('click', () => {
  // Get the values of the language and percentage inputs, and trim whitespace
  const language = languageInput.value.trim();
  const percentage = percentageInput.value.trim();

  // Checking if the inputs are not empty and the percentage is a valid number
  if (language && percentage && !isNaN(percentage)) {
    // Adding the new data to the database
    codingDb.push({
      language,
      percentage: parseInt(percentage)
    })
    .then(() => {
      // Clearing the input fields and hiding the update and cancel buttons
      languageInput.value = '';
      percentageInput.value = '';
      codingAddButton.style.display = 'block';
      codingUpdateButton.style.display = 'none';
      codingCancelButton.style.display = 'none';
    })
    .catch(() => {
      // Showing an alert message if there's an error
      alert('Error to be Added!');
    });
  }
});

// Adding a listener to the database reference to get updates when the data changes
codingDb.on('value', snapshot => {
  // Clearing the table body
  codingTableBody.innerHTML = '';

  // Looping through each child of the snapshot (each child is a skill)
  snapshot.forEach(childSnapshot => {
    // Extracting the language and percentage values from the child snapshot
    const { language, percentage } = childSnapshot.val();

    // Creating a new row in the table and inserting cells for each value
    const row = codingTableBody.insertRow();
    const languageCell = row.insertCell();
    const percentageCell = row.insertCell();
    const updateCell = row.insertCell();
    const deleteCell = row.insertCell();
    languageCell.textContent = language;
    percentageCell.textContent = percentage + '%';

    // Creating update and delete buttons for each row
    const updateButton = document.createElement('button');
    updateButton.className = 'update-button btn btn-info';
    updateButton.textContent = 'Update';
    updateCell.appendChild(updateButton);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteCell.appendChild(deleteButton);

    // Adding an event listener to the update button
    updateButton.addEventListener('click', () => {
      // Filling in the input fields with the current values and showing the update and cancel buttons
      languageInput.value = language;
      percentageInput.value = parseInt(percentageCell.textContent);
      codingAddButton.style.display = 'none';
      codingUpdateButton.style.display = 'block';
      codingCancelButton.style.display = 'block';

      // Adding an event listener to the update button inside the update button event listener
      codingUpdateButton.addEventListener('click', () => {
        // Getting the new language and percentage values and checking if they're valid
        const newLanguage = languageInput.value.trim();
        const newPercentage = percentageInput.value.trim();
        if (newLanguage && newPercentage && !isNaN(newPercentage)) {
          // Updating the data in the database and updating the table row
          codingDb.child(childSnapshot.key).update({
            language: newLanguage,
            percentage: parseInt(newPercentage)
          })
          .then(() => {
            // Set and clear the fields
            languageCell.textContent = newLanguage;
            percentageCell.textContent = newPercentage + '%';
            languageInput.value = '';
            percentageInput.value = '';
            codingAddButton.style.display = 'block';
            codingUpdateButton.style.display = 'none';
            codingCancelButton.style.display = 'none';
          })
          .catch(() => {
            // Raise an error for unsuccessfully update.
            alert('Error to be Updated!');
          });
        }
      });

      // Add an event listener for the cancel button
      codingCancelButton.addEventListener('click', () => {
        languageInput.value = '';
        percentageInput.value = '';
        codingAddButton.style.display = 'block';
        codingUpdateButton.style.display = 'none';
        codingCancelButton.style.display = 'none';
      });
    });

    // Add an event listner for delete button
    deleteButton.addEventListener('click', () => {
      codingDb.child(childSnapshot.key).remove()
      .then(() => {
        codingTableBody.removeChild(row);
      })
      .catch(() => {
        // Alert if there is an error to delete
        alert('Error to be Deleted!');
      });
    });
  });
});