const eduSkillsRef = firebase.database().ref("education");

eduSkillsRef.on("value", function(snapshot) {
  const eduTimeline = document.querySelector(".timeline");

  snapshot.forEach(function(childSnapshot) {
    const eduDate = childSnapshot.val().date;
    const eduCompany = childSnapshot.val().company;
    const level = childSnapshot.val().level;
    const eduDesc = childSnapshot.val().description;

    // Create a new timeline element for each education entry
    const eduTimelineItem = document.createElement("li");

    const eduTitle = document.createElement("div");
    eduTitle.classList.add("title");
    eduTitle.textContent = eduDate;

    const eduDetails = document.createElement("div");
    eduDetails.classList.add("details");

    const eduHeader = document.createElement("h5");
    eduHeader.textContent = eduCompany;

    const eduSubheader = document.createElement("small");
    eduSubheader.classList.add("fg-theme");
    eduSubheader.textContent = level;

    const eduDescription = document.createElement("p");
    const eduCode = document.createElement("code");
    eduCode.textContent = eduDesc;

    eduDescription.appendChild(eduCode);
    eduDetails.appendChild(eduHeader);
    eduDetails.appendChild(eduSubheader);
    eduDetails.appendChild(eduDescription);
    eduTimelineItem.appendChild(eduTitle);
    eduTimelineItem.appendChild(eduDetails);
    eduTimeline.appendChild(eduTimelineItem);
  });
});
