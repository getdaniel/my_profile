const designSkillsRef = firebase.database().ref("design-skills");

// Create progress bars for design skills
designSkillsRef.on("value", function(snapshot) {
  // Get the reference to the progress bars container elements
  const designProgressBars = document.querySelector("#design-progress-bars");

  snapshot.forEach(function(childSnapshot) {
    const framework = childSnapshot.val().framework;
    const designPercentage = childSnapshot.val().percentage;

    // Create a new progress bar element for each framework
    const designProgressWrapper = document.createElement("div");
    designProgressWrapper.classList.add("progress-wrapper", "wow", "fadeInUp");

    const designCaption = document.createElement("span");
    designCaption.classList.add("caption");
    designCaption.textContent = framework;

    const designProgress = document.createElement("div");
    designProgress.classList.add("progress");

    const designProgressBar = document.createElement("div");
    designProgressBar.classList.add("progress-bar");
    designProgressBar.setAttribute("role", "progressbar");
    designProgressBar.setAttribute("aria-valuenow", designPercentage);
    designProgressBar.setAttribute("aria-valuemin", "0");
    designProgressBar.setAttribute("aria-valuemax", "100");
    designProgressBar.style.width = designPercentage + "%";
    designProgressBar.textContent = designPercentage + "%";

    designProgress.appendChild(designProgressBar);
    designProgressWrapper.appendChild(designCaption);
    designProgressWrapper.appendChild(designProgress);
    designProgressBars.appendChild(designProgressWrapper);
  });
});