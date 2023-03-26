const expSkillsRef = firebase.database().ref("experience");

expSkillsRef.on("value", function(snapshot) {
  const expTimeline = document.querySelector(".exp-timeline");

  snapshot.forEach(function(childSnapshot) {
    const expDate = childSnapshot.val().date;
    const expCompany = childSnapshot.val().company;
    const workType = childSnapshot.val().workType;
    const expDesc = childSnapshot.val().description;

    // Create a new timeline element for each experience entry
    const expTimelineItem = document.createElement("li");

    const expTitle = document.createElement("div");
    expTitle.classList.add("title");
    expTitle.textContent = expDate;

    const expDetails = document.createElement("div");
    expDetails.classList.add("details");

    const expHeader = document.createElement("h5");
    expHeader.textContent = workType;

    const expSubheader = document.createElement("small");
    expSubheader.classList.add("fg-theme");
    expSubheader.textContent = expCompany;

    const expDescription = document.createElement("p");
    const expCode = document.createElement("code");
    expCode.textContent = expDesc;

    expDescription.appendChild(expCode);
    expDetails.appendChild(expHeader);
    expDetails.appendChild(expSubheader);
    expDetails.appendChild(expDescription);
    expTimelineItem.appendChild(expTitle);
    expTimelineItem.appendChild(expDetails);
    expTimeline.appendChild(expTimelineItem);
  });
});