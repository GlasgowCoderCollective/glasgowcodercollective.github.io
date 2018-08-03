var live = false;

if (live) {
  fetch("/api/youtube/workshop")
    .then(function(response) {
      return response.json();
    })
    .then(function(workshop) {
      document.querySelector(".workshop-title").innerText = workshop.title;
      document.querySelector(".workshop-description").innerText =
        workshop.description;
      document.querySelector(".workshop-frame").src =
        "https://www.youtube.com/embed/" + workshop.id;
    });
}
