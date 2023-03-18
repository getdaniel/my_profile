// Initialize Firebase Realtime Database
var db = firebase.database().ref('experience');

// Get table body element
var tableBody = document.querySelector('#experience-table tbody');

// Get form elements
var dateInput = document.querySelector('#exp-date-input');
var workTypeInput = document.querySelector('#work-type-input');
var companyInput = document.querySelector('#exp-company-input');
var expDescriptionInput = document.querySelector('#exp-description-input');
var addButton = document.querySelector('#add-experience-button');
var updateButton = document.querySelector('#update-experience-button');
var cancelButton = document.querySelector('#cancel-experience-button');

// Add event listener to Add button
addButton.addEventListener('click', function () {
  // Get form values
  var date = dateInput.value.trim();
  var workType = workTypeInput.value.trim();
  var company = companyInput.value.trim();
  var description = expDescriptionInput.value.trim();

  // Check if form values are valid
  if (date && workType && company && description) {
    // Add data to Realtime Database
    db.push({
      date: date,
      workType: workType,
      company: company,
      description: description
    })
      .then(function () {
        // Clear form inputs
        dateInput.value = '';
        workTypeInput.value = '';
        companyInput.value = '';
        expDescriptionInput.value = '';

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
    var dateCell = row.insertCell();
    var workTypeCell = row.insertCell();
    var companyCell = row.insertCell();
    var descriptionCell = row.insertCell();
    var updateCell = row.insertCell();
    var deleteCell = row.insertCell();
    dateCell.textContent = data.date;
    workTypeCell.textContent = data.workType;
    companyCell.textContent = data.company;
    descriptionCell.textContent = data.description;
    updateCell.innerHTML = '<button class="update-button btn btn-info">Update</button>';
    deleteCell.innerHTML = '<button class="delete-button btn btn-danger">Delete</button>';
    updateCell.querySelector('.update-button').addEventListener('click', function () {
      // Set form values to selected row
      dateInput.value = dateCell.textContent;
      workTypeInput.value = workTypeCell.textContent;
      companyInput.value = companyCell.textContent;
      expDescriptionInput.value = descriptionCell.textContent;

      // Show Update and Cancel buttons and hide Add button
      addButton.style.display = 'none';
      updateButton.style.display = 'block';
      cancelButton.style.display = 'block';

      // Update data in Realtime Database
      updateButton.addEventListener('click', function () {
        // Get new form values
        var newDate = dateInput.value.trim();
        var newWorkType = workTypeInput.value.trim();
        var newCompany = companyInput.value.trim();
        var newDescription = expDescriptionInput.value.trim();

        // Check if form values are valid
        if (newDate && newWorkType && newCompany && newDescription) {
          // Update data in Realtime Database
          db.child(childSnapshot.key).update({
            date: newDate,
            workType: newWorkType,
            company: newCompany,
            description: newDescription
          })
            .then(function () {
              // Clear form inputs
              dateInput.value = '';
              workTypeInput.value = '';
              companyInput.value = '';
              expDescriptionInput.value = '';

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
        dateInput.value = '';
        workTypeInput.value = '';
        companyInput.value = '';
        expDescriptionInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        addButton.style.display = 'block';
        updateButton.style.display = 'none';
        cancelButton.style.display = 'none';
      });
    });

    // Add event listener to Delete button
    deleteCell.querySelector('.delete-button').addEventListener('click', function () {
      // Delete data from Realtime Database
      db.child(childSnapshot.key).remove()
        .then(function () {
          console.log('Document successfully deleted!');
        })
        .catch(function (error) {
          console.error('Error deleting document: ', error);
        });
    });
  });
});