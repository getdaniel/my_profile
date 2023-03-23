const codingSkillsRef = firebase.database().ref("coding-skills");

codingSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var language = childSnapshot.val().language;
    var codingPercentage = childSnapshot.val().percentage;
    console.log("Language: " + language + ", Percentage: " + codingPercentage);
  });
});