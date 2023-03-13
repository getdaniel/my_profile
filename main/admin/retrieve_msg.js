// Retrieve the messages from Firebase
firebase.database().ref('messages').once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      
      // Populate the table with the message data
      $('#messages-table tbody').append('<tr><td>' + childData.name + '</td><td>' + childData.email + '</td><td>' + childData.subject + '</td><td>' + childData.message + '</td></tr>');
  });
});