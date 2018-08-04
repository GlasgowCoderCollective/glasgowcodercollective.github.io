var grid = document.querySelector(".video-grid");
var spinner = document.querySelector(".fa-spinner");
var loader = document.querySelector(".loader");

fetch("/api/youtube/videos")
  .then(function(response) {
    return response.json();
  })
  .then(function(videos) {
    for (var i = 0; i < videos.length; i++) {
      if (videos[i].id) {
        var htmlString = `
            <div class="video-card">
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/${
              videos[i].id.videoId
            }" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          `;

        grid.innerHTML += htmlString;
      }
    }

    spinner.classList.add("hide");
    loader.classList.add("show");
  });
