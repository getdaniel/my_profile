// Initialize Firebase Realtime Database
const eduDb = firebase.database().ref('education');

// Get table body element
const eduTableBody = document.querySelector('#education-table tbody');

// Get form elements
const eduDateInput = document.querySelector('#date-input');
const eduCompanyInput = document.querySelector('#company-input');
const eduLevelInput = document.querySelector('#level-input');
const eduDescriptionInput = document.querySelector('#edu-description-input');
const eduAddButton = document.querySelector('#add-education-button');
const eduUpdateButton = document.querySelector('#update-education-button');
const eduCancelButton = document.querySelector('#cancel-education-button');

// Add event listener to Add button
eduAddButton.addEventListener('click', () => {
    // Get form values
    var date = eduDateInput.value.trim();
    var company = eduCompanyInput.value.trim();
    var level = eduLevelInput.value.trim();
    var description = eduDescriptionInput.value.trim();

    // Check if form values are valid
    if (date && company && level && description) {
        // Add data to Realtime Database
        eduDb.push({
            date: date,
            company: company,
            level: level,
            description: description
        })
            .then(() => {
                // Clear form inputs
                eduDateInput.value = '';
                eduCompanyInput.value = '';
                eduLevelInput.value = '';
                eduDescriptionInput.value = '';

                // Show Add button and hide Update and Cancel buttons
                eduAddButton.style.display = 'block';
                eduUpdateButton.style.display = 'none';
                eduCancelButton.style.display = 'none';
            })
            .catch(() => {
                alert('Successfully Added!');
            });
    }
});

// Listen for changes to Realtime Database
eduDb.on('value', function (snapshot) {
    // Clear table body
    eduTableBody.innerHTML = '';

    // Loop through each data item and add to table
    snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        var row = eduTableBody.insertRow();
        var dateCell = row.insertCell();
        var companyCell = row.insertCell();
        var levelCell = row.insertCell();
        var descriptionCell = row.insertCell();
        var updateCell = row.insertCell();
        var deleteCell = row.insertCell();
        dateCell.textContent = data.date;
        companyCell.textContent = data.company;
        levelCell.textContent = data.level;
        descriptionCell.textContent = data.description;
        updateCell.innerHTML = '<button class="update-button btn btn-info">Update</button>';
        deleteCell.innerHTML = '<button class="delete-button btn btn-danger">Delete</button>';
        updateCell.querySelector('.update-button').addEventListener('click', function () {
            // Set form values to selected row
            eduDateInput.value = dateCell.textContent;
            eduCompanyInput.value = companyCell.textContent;
            eduLevelInput.value = levelCell.textContent;
            eduDescriptionInput.value = descriptionCell.textContent;

            // Show Update and Cancel buttons and hide Add button
            eduAddButton.style.display = 'none';
            eduUpdateButton.style.display = 'block';
            eduCancelButton.style.display = 'block';

            // Update data in Realtime Database
            eduUpdateButton.addEventListener('click', () => {
                // Get new form values
                var newDate = eduDateInput.value.trim();
                var newCompany = eduCompanyInput.value.trim();
                var newLevel = eduLevelInput.value.trim();
                var newDescription = eduDescriptionInput.value.trim();

                // Check if form values are valid
                if (newDate && newCompany && newLevel && newDescription) {
                    // Update data in Realtime Database
                    eduDb.child(childSnapshot.key).update({
                        date: newDate,
                        company: newCompany,
                        level: newLevel,
                        description: newDescription
                    })
                        .then(() => {
                            // Clear form inputs
                            eduDateInput.value = '';
                            eduCompanyInput.value = '';
                            eduLevelInput.value = '';
                            eduDescriptionInput.value = '';
                            // Show Add button and hide Update and Cancel buttons
                            eduAddButton.style.display = 'block';
                            eduUpdateButton.style.display = 'none';
                            eduCancelButton.style.display = 'none';
                        })
                        .catch(() => {
                            alert('Successfully Updated!');
                        });
                }
            });

            // Cancel update
            eduCancelButton.addEventListener('click', () => {
                // Clear form inputs
                eduDateInput.value = '';
                eduCompanyInput.value = '';
                eduLevelInput.value = '';
                eduDescriptionInput.value = '';

                // Show Add button and hide Update and Cancel buttons
                eduAddButton.style.display = 'block';
                eduUpdateButton.style.display = 'none';
                eduCancelButton.style.display = 'none';
            });
        });

        // Delete data from Realtime Database
        deleteCell.querySelector('.delete-button').addEventListener('click', () => {
            eduDb.child(childSnapshot.key).remove()
                .then(() => {
                    eduTableBody.removeChild(row);
                })
                .catch(() => {
                    alert('Successfully Deleted!');
                });
        });
    });
});                    
