const expSkillsRef = firebase.database().ref("experience");

expSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var date = childSnapshot.val().date;
    var company = childSnapshot.val().company;
    var workType = childSnapshot.val().workType;
    var desc = childSnapshot.val().description;
    console.log("Date: " + date + ", Company: " + company + ", Work Type: " + workType + ", Description: " + desc);
  });
});