const fetch = require('node-fetch');
const config = require('../../config');

/**
 * Get the latest workshop from the YouTube playlist
 */
const getLatestWorkshop = () => new Promise((resolve) => {
  fetch(config.latestWorkshopUrl)
    .then((response) => response.json())
    .then((json) => resolve(json));
});

/**
 * Get the all the videos from YouTube channel
 */
const getYoutubeVideos = () => new Promise((resolve) => fetch(config.videosUrl)
  .then((response) => response.json())
  .then((json) => resolve(json)));

module.exports = {
  getLatestWorkshop,
  getYoutubeVideos,
};
