const codingDb = firebase.database().ref('coding-skills');
const codingTableBody = document.querySelector('#coding-skills-table tbody');
const languageInput = document.querySelector('#language-input');
const percentageInput = document.querySelector('#percentage-input');
const codingAddButton = document.querySelector('#add-coding-skill-button');
const codingUpdateButton = document.querySelector('#update-coding-skill-button');
const codingCancelButton = document.querySelector('#cancel-coding-skill-button');

codingAddButton.addEventListener('click', () => {
  const language = languageInput.value.trim();
  const percentage = percentageInput.value.trim();

  if (language && percentage && !isNaN(percentage)) {
    codingDb.push({
      language,
      percentage: parseInt(percentage)
    })
    .then(() => {
      languageInput.value = '';
      percentageInput.value = '';
      codingAddButton.style.display = 'block';
      codingUpdateButton.style.display = 'none';
      codingCancelButton.style.display = 'none';
    })
    .catch(() => {
      alert('Successfully Added!');
    });
  }
});

codingDb.on('value', snapshot => {
  codingTableBody.innerHTML = '';
  snapshot.forEach(childSnapshot => {
    const { language, percentage } = childSnapshot.val();
    const row = codingTableBody.insertRow();
    const languageCell = row.insertCell();
    const percentageCell = row.insertCell();
    const updateCell = row.insertCell();
    const deleteCell = row.insertCell();
    languageCell.textContent = language;
    percentageCell.textContent = percentage + '%';
    const updateButton = document.createElement('button');
    updateButton.className = 'update-button btn btn-info';
    updateButton.textContent = 'Update';
    updateCell.appendChild(updateButton);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button btn btn-danger';
    deleteButton.textContent = 'Delete';
    deleteCell.appendChild(deleteButton);

    updateButton.addEventListener('click', () => {
      languageInput.value = language;
      percentageInput.value = parseInt(percentageCell.textContent);
      codingAddButton.style.display = 'none';
      codingUpdateButton.style.display = 'block';
      codingCancelButton.style.display = 'block';

      codingUpdateButton.addEventListener('click', () => {
        const newLanguage = languageInput.value.trim();
        const newPercentage = percentageInput.value.trim();
        if (newLanguage && newPercentage && !isNaN(newPercentage)) {
          codingDb.child(childSnapshot.key).update({
            language: newLanguage,
            percentage: parseInt(newPercentage)
          })
          .then(() => {
            languageCell.textContent = newLanguage;
            percentageCell.textContent = newPercentage + '%';
            languageInput.value = '';
            percentageInput.value = '';
            codingAddButton.style.display = 'block';
            codingUpdateButton.style.display = 'none';
            codingCancelButton.style.display = 'none';
          })
          .catch(() => {
            alert('Successfully Updated!');
          });
        }
      });

      codingCancelButton.addEventListener('click', () => {
        languageInput.value = '';
        percentageInput.value = '';
        codingAddButton.style.display = 'block';
        codingUpdateButton.style.display = 'none';
        codingCancelButton.style.display = 'none';
      });
    });

    deleteButton.addEventListener('click', () => {
      codingDb.child(childSnapshot.key).remove()
      .then(() => {
        codingTableBody.removeChild(row);
      })
      .catch(() => {
        alert('Successfully Deleted!');
      });
    });
  });
});