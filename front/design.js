const designSkillsRef = firebase.database().ref("design-skills");

designSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var framework = childSnapshot.val().framework;
    var designPercentage = childSnapshot.val().percentage;
    console.log("Framework: " + framework + ", Percentage: " + designPercentage);
  });
});