const codingSkillsRef = firebase.database().ref("coding-skills");

codingSkillsRef.on("value", function(snapshot) {

  const progressBars = document.querySelector("#coding-progress-bars");

  snapshot.forEach(function(childSnapshot) {
    var language = childSnapshot.val().language;
    var codingPercentage = childSnapshot.val().percentage;

    // Create a new progress bar element for each language
    const progressWrapper = document.createElement("div");
    progressWrapper.classList.add("progress-wrapper", "wow", "fadeInUp");

    const caption = document.createElement("span");
    caption.classList.add("caption");
    caption.textContent = language;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("role", "progressbar");
    progressBar.setAttribute("aria-valuenow", codingPercentage);
    progressBar.setAttribute("aria-valuemin", "0");
    progressBar.setAttribute("aria-valuemax", "100");
    progressBar.style.width = codingPercentage + "%";
    progressBar.textContent = codingPercentage + "%";

    progress.appendChild(progressBar);
    progressWrapper.appendChild(caption);
    progressWrapper.appendChild(progress);

    progressBars.appendChild(progressWrapper);
  });
});