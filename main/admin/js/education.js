// Initialize Firebase Realtime Database
var db = firebase.database().ref('education');

// Get table body element
var tableBody = document.querySelector('#education-table tbody');

// Get form elements
var dateInput = document.querySelector('#date-input');
var companyInput = document.querySelector('#company-input');
var levelInput = document.querySelector('#level-input');
var eduDescriptionInput = document.querySelector('#edu-description-input');
var addButton = document.querySelector('#add-education-button');
var updateButton = document.querySelector('#update-education-button');
var cancelButton = document.querySelector('#cancel-education-button');

// Add event listener to Add button
addButton.addEventListener('click', function () {
    // Get form values
    var date = dateInput.value.trim();
    var company = companyInput.value.trim();
    var level = levelInput.value.trim();
    var description = eduDescriptionInput.value.trim();

    // Check if form values are valid
    if (date && company && level && description) {
        // Add data to Realtime Database
        db.push({
            date: date,
            company: company,
            level: level,
            description: description
        })
            .then(function () {
                // Clear form inputs
                dateInput.value = '';
                companyInput.value = '';
                levelInput.value = '';
                eduDescriptionInput.value = '';

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
            dateInput.value = dateCell.textContent;
            companyInput.value = companyCell.textContent;
            levelInput.value = levelCell.textContent;
            eduDescriptionInput.value = descriptionCell.textContent;

            // Show Update and Cancel buttons and hide Add button
            addButton.style.display = 'none';
            updateButton.style.display = 'block';
            cancelButton.style.display = 'block';

            // Update data in Realtime Database
            updateButton.addEventListener('click', function () {
                // Get new form values
                var newDate = dateInput.value.trim();
                var newCompany = companyInput.value.trim();
                var newLevel = levelInput.value.trim();
                var newDescription = eduDescriptionInput.value.trim();

                // Check if form values are valid
                if (newDate && newCompany && newLevel && newDescription) {
                    // Update data in Realtime Database
                    db.child(childSnapshot.key).update({
                        date: newDate,
                        company: newCompany,
                        level: newLevel,
                        description: newDescription
                    })
                        .then(function () {
                            // Clear form inputs
                            dateInput.value = '';
                            companyInput.value = '';
                            levelInput.value = '';
                            eduDescriptionInput.value = '';
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

            // Cancel update
            cancelButton.addEventListener('click', function () {
                // Clear form inputs
                dateInput.value = '';
                companyInput.value = '';
                levelInput.value = '';
                eduDescriptionInput.value = '';

                // Show Add button and hide Update and Cancel buttons
                addButton.style.display = 'block';
                updateButton.style.display = 'none';
                cancelButton.style.display = 'none';
            });
        });

        // Delete data from Realtime Database
        deleteCell.querySelector('.delete-button').addEventListener('click', function () {
            db.child(childSnapshot.key).remove()
                .then(function () {
                    console.log('Document successfully deleted!');
                })
                .catch(function (error) {
                    console.error('Error removing document: ', error);
                });
        });
    });
});                    
