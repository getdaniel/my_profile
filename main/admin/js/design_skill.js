// Initialize Firebase Realtime Database
const designDb = firebase.database().ref('design-skills');

// Get table body element
const designTableBody = document.querySelector('#design-skills-table tbody');

// Get form elements
const frameworkInput = document.querySelector('#framework-input');
const frameworkPercentageInput = document.querySelector('#framework-percentage-input');
const designAddButton = document.querySelector('#add-design-skill-button');
const designUpdateButton = document.querySelector('#update-design-skill-button');
const designCancelButton = document.querySelector('#cancel-design-skill-button');

// Add event listener to Add button
designAddButton.addEventListener('click', () => {
    // Get form values
    var framework = frameworkInput.value.trim();
    var percentage = frameworkPercentageInput.value.trim();

    // Check if form values are valid
    if (framework && percentage && !isNaN(percentage)) {
        // Add data to Realtime Database
        designDb.push({
            framework: framework,
            percentage: parseInt(percentage)
        })
            .then(() => {
                // Clear form inputs
                frameworkInput.value = '';
                frameworkPercentageInput.value = '';

                // Show Add button and hide Update and Cancel buttons
                designAddButton.style.display = 'block';
                designUpdateButton.style.display = 'none';
                designCancelButton.style.display = 'none';
            })
            .catch(() => {
                alert('Successfully Added!');
            });
    }
});

// Listen for changes to Realtime Database
designDb.on('value', function (snapshot) {
    // Clear table body
    designTableBody.innerHTML = '';

    // Loop through each data item and add to table
    snapshot.forEach(function (childSnapshot) {
        var data = childSnapshot.val();
        var row = designTableBody.insertRow();
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
            designAddButton.style.display = 'none';
            designUpdateButton.style.display = 'block';
            designCancelButton.style.display = 'block';

            // Update data in Realtime Database
            designUpdateButton.addEventListener('click', () => {
                // Get new form values
                var newFramework = frameworkInput.value.trim();
                var newPercentage = frameworkPercentageInput.value.trim();

                // Check if form values are valid
                if (newFramework && newPercentage && !isNaN(newPercentage)) {
                    // Update data in Realtime Database
                    designDb.child(childSnapshot.key).update({
                        framework: newFramework,
                        percentage: parseInt(newPercentage)
                    })
                        .then(() => {
                            // Update data in table
                            frameworkCell.textContent = newFramework;
                            percentageCell.textContent = newPercentage + '%';

                            // Clear form inputs
                            frameworkInput.value = '';
                            frameworkPercentageInput.value = '';

                            // Show Add button and hide Update and Cancel buttons
                            designAddButton.style.display = 'block';
                            designUpdateButton.style.display = 'none';
                            designCancelButton.style.display = 'none';
                        })
                        .catch(() => {
                            alert('Successfully Updated!');
                        });
                }
            });

            // Add event listener to Cancel button
            designCancelButton.addEventListener('click', () => {
                // Clear form inputs
                frameworkInput.value = '';
                frameworkPercentageInput.value = '';

                // Show Add button and hide Update and Cancel buttons
                designAddButton.style.display = 'block';
                designUpdateButton.style.display = 'none';
                designCancelButton.style.display = 'none';
            });

        });

        deleteCell.querySelector('.delete-button').addEventListener('click', function () {
            // Remove data from Realtime Database
            designDb.child(childSnapshot.key).remove()
                .then(() => {
                    // Remove row from table
                    designTableBody.removeChild(row);
                })
                .catch(() => {
                    alert('Successfully Deleted!');
                });
        });
    });
});