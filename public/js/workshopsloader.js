var workshopsContainer = document.querySelector(".grid");

function GetWorkshops() {
  fetch("/api/workshops")
    .then(function(response) {
      return response.json();
    })
    .then(function(workshops) {
      workshops.map(function(workshop) {
        if (workshop.description.length >= 80) {
          workshop.description = workshop.description.substring(0, 77) + "...";
        }
        workshopsContainer.innerHTML += displayWorkshop(workshop);
      });
    })
    .catch(function() {
      console.error("Could not display workshops");
    });
}

function displayWorkshop(workshop) {
  return `<div class="workshop"><h4>${workshop.title}</h4><p>${
    workshop.description
  }</p><a href="/workshop?id=${workshop.id}">Click here</a></div>`;
}

GetWorkshops();
