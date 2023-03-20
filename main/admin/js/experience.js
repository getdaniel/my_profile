// Initialize Firebase Realtime Database
const expDb = firebase.database().ref('experience');

// Get table body element
const expTableBody = document.querySelector('#experience-table tbody');

// Get form elements
const expDateInput = document.querySelector('#exp-date-input');
const expWorkTypeInput = document.querySelector('#work-type-input');
const expCompanyInput = document.querySelector('#exp-company-input');
const expDescriptionInput = document.querySelector('#exp-description-input');
const expAddButton = document.querySelector('#add-experience-button');
const expUpdateButton = document.querySelector('#update-experience-button');
const expCancelButton = document.querySelector('#cancel-experience-button');

// Add event listener to Add button
expAddButton.addEventListener('click', () => {
  // Get form values
  var date = expDateInput.value.trim();
  var workType = expWorkTypeInput.value.trim();
  var company = expCompanyInput.value.trim();
  var description = expDescriptionInput.value.trim();

  // Check if form values are valid
  if (date && workType && company && description) {
    // Add data to Realtime Database
    expDb.push({
      date: date,
      workType: workType,
      company: company,
      description: description
    })
      .then(() => {
        // Clear form inputs
        expDateInput.value = '';
        expWorkTypeInput.value = '';
        expCompanyInput.value = '';
        expDescriptionInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        expAddButton.style.display = 'block';
        expUpdateButton.style.display = 'none';
        expCancelButton.style.display = 'none';
      })
      .catch(function () {
        alert('Successfully Added!');
      });
  }
});

// Listen for changes to Realtime Database
expDb.on('value', function (snapshot) {
  // Clear table body
  expTableBody.innerHTML = '';

  // Loop through each data item and add to table
  snapshot.forEach(function (childSnapshot) {
    var data = childSnapshot.val();
    var row = expTableBody.insertRow();
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
    updateCell.querySelector('.update-button').addEventListener('click', () => {
      // Set form values to selected row
      expDateInput.value = dateCell.textContent;
      expWorkTypeInput.value = workTypeCell.textContent;
      expCompanyInput.value = companyCell.textContent;
      expDescriptionInput.value = descriptionCell.textContent;

      // Show Update and Cancel buttons and hide Add button
      expAddButton.style.display = 'none';
      expUpdateButton.style.display = 'block';
      expCancelButton.style.display = 'block';

      // Update data in Realtime Database
      expUpdateButton.addEventListener('click', () => {
        // Get new form values
        var newDate = expDateInput.value.trim();
        var newWorkType = expWorkTypeInput.value.trim();
        var newCompany = expCompanyInput.value.trim();
        var newDescription = expDescriptionInput.value.trim();

        // Check if form values are valid
        if (newDate && newWorkType && newCompany && newDescription) {
          // Update data in Realtime Database
          expDb.child(childSnapshot.key).update({
            date: newDate,
            workType: newWorkType,
            company: newCompany,
            description: newDescription
          })
            .then(() => {
              // Clear form inputs
              expDateInput.value = '';
              expWorkTypeInput.value = '';
              expCompanyInput.value = '';
              expDescriptionInput.value = '';

              // Show Add button and hide Update and Cancel buttons
              expAddButton.style.display = 'block';
              expUpdateButton.style.display = 'none';
              expCancelButton.style.display = 'none';
            })
            .catch(() => {
              alert('Successfully Updated!');
            });
        }
      });

      // Add event listener to Cancel button
      expCancelButton.addEventListener('click', () => {
        // Clear form inputs
        expDateInput.value = '';
        expWorkTypeInput.value = '';
        expCompanyInput.value = '';
        expDescriptionInput.value = '';

        // Show Add button and hide Update and Cancel buttons
        expAddButton.style.display = 'block';
        expUpdateButton.style.display = 'none';
        expCancelButton.style.display = 'none';
      });
    });

    // Add event listener to Delete button
    deleteCell.querySelector('.delete-button').addEventListener('click', () => {
      // Delete data from Realtime Database
      expDb.child(childSnapshot.key).remove()
        .then(() => {
          expTableBody.removeChild(row);
        })
        .catch(() => {
          alert('Successfully Deleted!');
        });
    });
  });
});