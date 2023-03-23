const codingSkillsRef = firebase.database().ref("coding-skills");

codingSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var language = childSnapshot.val().language;
    var codingPercentage = childSnapshot.val().percentage;
    console.log("Language: " + language + ", Percentage: " + codingPercentage);

    // Update the language and percentage value
    document.querySelector(".progress-wrapper .caption").textContent = language;
    document.querySelector(".progress-bar").style.width = codingPercentage + "%";
    document.querySelector(".progress-bar").setAttribute("aria-valuenow", codingPercentage)
  });
});