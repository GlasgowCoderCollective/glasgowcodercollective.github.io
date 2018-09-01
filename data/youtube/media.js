const fetch = require("node-fetch");
const { youtube_key } = require('../../config');

const getLatestWorkshop = () => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=PLwewcoGnsFsfF186l11QcDLquwkACOfjW&fields=items(snippet(description%2CresourceId%2FvideoId%2Cthumbnails%2Fstandard%2Furl%2Ctitle))&key=${youtube_key}`
    )
      .then(response => response.json())
      .then(json => {
        // TODO: Error checking here
        resolve(json);
      });
  });
};

const getYoutubeVideos = () => {
  return new Promise((resolve, reject) => {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCW1GG-QroKAV5No7xzVssJw&maxResults=25&order=date&fields=items(id%2FvideoId%2Csnippet(description%2Ctitle))&key=${youtube_key}`)
      .then(response => response.json())
      .then(json => {
        // TODO: Error checking here
        resolve(json);
      })
  });
}

module.exports = {
  getLatestWorkshop,
  getYoutubeVideos
};
