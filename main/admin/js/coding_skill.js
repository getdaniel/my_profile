// Initialize Firebase Realtime Database
const codingDb = firebase.database().ref('coding-skills');

// Get table body element
const codingTableBody = document.querySelector('#coding-skills-table tbody');

// Get form elements
const languageInput = document.querySelector('#language-input');
const percentageInput = document.querySelector('#percentage-input');
const codingAddButton = document.querySelector('#add-coding-skill-button');
const codingUpdateButton = document.querySelector('#update-coding-skill-button');
const codingCancelButton = document.querySelector('#cancel-coding-skill-button');

// Add event listener to Add button
codingAddButton.addEventListener('click', () => {
  // Get form values
  var language = languageInput.value.trim();
  var percentage = percentageInput.value.trim();

  // Check if form values are valid
  if (language && percentage && !isNaN(percentage)) {
    // Add data to Realtime Database
    codingDb.push({
      language: language,
      percentage: parseInt(percentage)
    })
      .then(() => {
        // Clear form inputs
        languageInput.value = '';
        percentageInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        codingAddButton.style.display = 'block';
        codingUpdateButton.style.display = 'none';
        codingCancelButton.style.display = 'none';
      })
      .catch(() => {
        alert('Successfully Added!');
      });
  }
});

// Listen for changes to Realtime Database
codingDb.on('value', function (snapshot) {
  // Clear table body
  codingTableBody.innerHTML = '';

  // Loop through each data item and add to table
  snapshot.forEach(function (childSnapshot) {
    var data = childSnapshot.val();
    var row = codingTableBody.insertRow();
    var languageCell = row.insertCell();
    var percentageCell = row.insertCell();
    var updateCell = row.insertCell();
    var deleteCell = row.insertCell();
    languageCell.textContent = data.language;
    percentageCell.textContent = data.percentage + '%';
    updateCell.innerHTML = '<button class="update-button btn btn-info">Update</button>';
    deleteCell.innerHTML = '<button class="delete-button btn btn-danger">Delete</button>';
    updateCell.querySelector('.update-button').addEventListener('click', () => {
      // Set form values to selected row
      languageInput.value = languageCell.textContent;
      percentageInput.value = parseInt(percentageCell.textContent);

      // Show Update and Cancel buttons and hide Add button
      codingAddButton.style.display = 'none';
      codingUpdateButton.style.display = 'block';
      codingCancelButton.style.display = 'block';

      // Update data in Realtime Database
      codingUpdateButton.addEventListener('click', function () {
        // Get new form values
        var newLanguage = languageInput.value.trim();
        var newPercentage = percentageInput.value.trim();

        // Check if form values are valid
        if (newLanguage && newPercentage && !isNaN(newPercentage)) {
          // Update data in Realtime Database
          codingDb.child(childSnapshot.key).update({
            language: newLanguage,
            percentage: parseInt(newPercentage)
          })
            .then(() => {
              // Update data in table
              languageCell.textContent = newLanguage;
              percentageCell.textContent = newPercentage + '%';

              // Clear form inputs
              languageInput.value = '';
              percentageInput.value = '';

              // Show Add button and hide Update and Cancel buttons
              codingAddButton.style.display = 'block';
              codingUpdateButton.style.display = 'none';
              codingCancelButton.style.display = 'none';
            })
            .catch(() => {
              alert('Successfully Updated!');
            });
        }
      });

      // Add event listener to Cancel button
      codingCancelButton.addEventListener('click', () => {
        // Clear form inputs
        languageInput.value = '';
        percentageInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        codingAddButton.style.display = 'block';
        codingUpdateButton.style.display = 'none';
        codingCancelButton.style.display = 'none';
      });
    });

    // Add event listener to Delete button
    deleteCell.querySelector('.delete-button').addEventListener('click', () => {
      // Remove data from Realtime Database
      codingDb.child(childSnapshot.key).remove()
        .then(() => {
          // Remove data from table
          codingTableBody.removeChild(row);
        })
        .catch(() => {
          alert('Successfully Deleted!');
        });
    });
  });
});
