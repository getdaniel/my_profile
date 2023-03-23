const eduSkillsRef = firebase.database().ref("education");

eduSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var date = childSnapshot.val().date;
    var company = childSnapshot.val().company;
    var level = childSnapshot.val().level;
    var desc = childSnapshot.val().description;
    console.log("Date: " + date + ", Company: " + company + ", Level: " + level + ", Description: " + desc);
  });
});