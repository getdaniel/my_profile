// Initialize Firebase Realtime Database
var db = firebase.database().ref('design-skills');

// Get table body element
var tableBody = document.querySelector('#design-skills-table tbody');

// Get form elements
var frameworkInput = document.querySelector('#framework-input');
var frameworkPercentageInput = document.querySelector('#framework-percentage-input');
var addButton = document.querySelector('#add-design-skill-button');
var updateButton = document.querySelector('#update-design-skill-button');
var cancelButton = document.querySelector('#cancel-design-skill-button');

// Add event listener to Add button
addButton.addEventListener('click', function () {
    // Get form values
    var framework = frameworkInput.value.trim();
    var percentage = frameworkPercentageInput.value.trim();

    // Check if form values are valid
    if (framework && percentage && !isNaN(percentage)) {
        // Add data to Realtime Database
        db.push({
            framework: framework,
            percentage: parseInt(percentage)
        })
            .then(function () {
                // Clear form inputs
                frameworkInput.value = '';
                frameworkPercentageInput.value = '';

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
        var frameworkCell = row.insertCell();
        var percentageCell = row.insertCell();
        var updateCell = row.insertCell();
        var deleteCell = row.insertCell();
        frameworkCell.textContent = data.framework;
        percentageCell.textContent = data.percentage + '%';
        updateCell.innerHTML = '<button class="update-button btn btn-info">Update</button>';
        deleteCell.innerHTML = '<button class="delete-button btn btn-danger">Delete</button>';
        updateCell.querySelector('.update-button').addEventListener('click', function () {
            // Set form values to selected row
            frameworkInput.value = frameworkCell.textContent;
            frameworkPercentageInput.value = parseInt(percentageCell.textContent);

            // Show Update and Cancel buttons and hide Add button
            addButton.style.display = 'none';
            updateButton.style.display = 'block';
            cancelButton.style.display = 'block';

            // Update data in Realtime Database
            updateButton.addEventListener('click', function () {
                // Get new form values
                var newFramework = frameworkInput.value.trim();
                var newPercentage = frameworkPercentageInput.value.trim();

                // Check if form values are valid
                if (newFramework && newPercentage && !isNaN(newPercentage)) {
                    // Update data in Realtime Database
                    db.child(childSnapshot.key).update({
                        framework: newFramework,
                        percentage: parseInt(newPercentage)
                    })
                        .then(function () {
                            // Update data in table
                            frameworkCell.textContent = newFramework;
                            percentageCell.textContent = newPercentage + '%';

                            // Clear form inputs
                            frameworkInput.value = '';
                            frameworkPercentageInput.value = '';

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
                frameworkInput.value = '';
                frameworkPercentageInput.value = '';

                // Show Add button and hide Update and Cancel buttons
                addButton.style.display = 'block';
                updateButton.style.display = 'none';
                cancelButton.style.display = 'none';
            });

        });

        deleteCell.querySelector('.delete-button').addEventListener('click', function () {
            // Remove data from Realtime Database
            db.child(childSnapshot.key).remove()
                .then(function () {
                    // Remove row from table
                    tableBody.removeChild(row);
                })
                .catch(function (error) {
                    console.error('Error removing document: ', error);
                });
        });
    });
});