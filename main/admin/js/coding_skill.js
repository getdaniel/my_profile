// Initialize Firebase Realtime Database
var db = firebase.database().ref('coding-skills');

// Get table body element
var tableBody = document.querySelector('#coding-skills-table tbody');

// Get form elements
var languageInput = document.querySelector('#language-input');
var percentageInput = document.querySelector('#percentage-input');
var addButton = document.querySelector('#add-coding-skill-button');
var updateButton = document.querySelector('#update-coding-skill-button');
var cancelButton = document.querySelector('#cancel-coding-skill-button');

// Add event listener to Add button
addButton.addEventListener('click', function () {
  // Get form values
  var language = languageInput.value.trim();
  var percentage = percentageInput.value.trim();

  // Check if form values are valid
  if (language && percentage && !isNaN(percentage)) {
    // Add data to Realtime Database
    db.push({
      language: language,
      percentage: parseInt(percentage)
    })
      .then(function () {
        // Clear form inputs
        languageInput.value = '';
        percentageInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        addButton.style.display = 'block';
        updateButton.style.display = 'none';
        cancelButton.style.display = 'none';
      })
      .catch(function (error) {
        console.error('Error adding document: ', error);
      });
  }
});

// Listen for changes to Realtime Database
db.on('value', function (snapshot) {
  // Clear table body
  tableBody.innerHTML = '';

  // Loop through each data item and add to table
  snapshot.forEach(function (childSnapshot) {
    var data = childSnapshot.val();
    var row = tableBody.insertRow();
    var languageCell = row.insertCell();
    var percentageCell = row.insertCell();
    var updateCell = row.insertCell();
    var deleteCell = row.insertCell();
    languageCell.textContent = data.language;
    percentageCell.textContent = data.percentage + '%';
    updateCell.innerHTML = '<button class="update-button">Update</button>';
    deleteCell.innerHTML = '<button class="delete-button">Delete</button>';
    updateCell.querySelector('.update-button').addEventListener('click', function () {
      // Set form values to selected row
      languageInput.value = languageCell.textContent;
      percentageInput.value = parseInt(percentageCell.textContent);

      // Show Update and Cancel buttons and hide Add button
      addButton.style.display = 'none';
      updateButton.style.display = 'block';
      cancelButton.style.display = 'block';

      // Update data in Realtime Database
      updateButton.addEventListener('click', function () {
        // Get new form values
        var newLanguage = languageInput.value.trim();
        var newPercentage = percentageInput.value.trim();

        // Check if form values are valid
        if (newLanguage && newPercentage && !isNaN(newPercentage)) {
          // Update data in Realtime Database
          db.child(childSnapshot.key).update({
            language: newLanguage,
            percentage: parseInt(newPercentage)
          })
            .then(function () {
              // Update data in table
              languageCell.textContent = newLanguage;
              percentageCell.textContent = newPercentage + '%';

              // Clear form inputs
              languageInput.value = '';
              percentageInput.value = '';

              // Show Add button and hide Update and Cancel buttons
              addButton.style.display = 'block';
              updateButton.style.display = 'none';
              cancelButton.style.display = 'none';
            })
            .catch(function (error) {
              console.error('Error updating document: ', error);
            });
        }
      });

      // Add event listener to Cancel button
      cancelButton.addEventListener('click', function () {
        // Clear form inputs
        languageInput.value = '';
        percentageInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        addButton.style.display = 'block';
        updateButton.style.display = 'none';
        cancelButton.style.display = 'none';
      });
    });

    // Add event listener to Delete button
    deleteCell.querySelector('.delete-button').addEventListener('click', function () {
      // Remove data from Realtime Database
      db.child(childSnapshot.key).remove()
        .then(function () {
          // Remove data from table
          tableBody.removeChild(row);
        })
        .catch(function (error) {
          console.error('Error removing document: ', error);
        });
    });
  });
});
