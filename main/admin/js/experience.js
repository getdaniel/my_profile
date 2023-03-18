// Add event listener to add button in Experience form
document.getElementById("add-experience-button").addEventListener("click", function() {
    // Get input values
    var date = document.getElementById("date-input").value;
    var workType = document.getElementById("work-type-input").value;
    var company = document.getElementById("company-input").value;
    var description = document.getElementById("exp-description-input").value;
  
    // Get a reference to the "Experience" table in Firebase
    var experienceRef = firebase.database().ref("Experience");
  
    // Push new data to Firebase
    experienceRef.push({
      date: date,
      workType: workType,
      company: company,
      description: description
    });
  });  