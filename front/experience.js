const expSkillsRef = firebase.database().ref("experience");

expSkillsRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var expDate = childSnapshot.val().date;
    var expCompany = childSnapshot.val().company;
    var workType = childSnapshot.val().workType;
    var ExpDesc = childSnapshot.val().description;
    console.log("Date: " + expDate + ", Company: " + expCompany + ", Work Type: " + workType + ", Description: " + ExpDesc);
  });
});