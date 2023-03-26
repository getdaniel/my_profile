const expSkillsRef = firebase.database().ref("experience");

expSkillsRef.on("value", function(snapshot) {
  const expTimeline = document.querySelector(".timeline");

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