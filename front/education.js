const eduSkillsRef = firebase.database().ref("education");

eduSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var eduDate = childSnapshot.val().date;
    var eduCompany = childSnapshot.val().company;
    var level = childSnapshot.val().level;
    var eduDesc = childSnapshot.val().description;
    console.log("Date: " + eduDate + ", Company: " + eduCompany + ", Level: " + level + ", Description: " + eduDesc);
  });
});