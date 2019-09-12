const fetch = require('node-fetch');
const config = require('../../config');

/**
 * Get the latest workshop from the YouTube playlist
 */
const getLatestWorkshop = () => {
  return new Promise(resolve => {
    fetch(config.latest_workshop_url)
      .then(response => response.json())
      .then(json => resolve(json));
  });
};

/**
 * Get the all the videos from YouTube channel
 */
const getYoutubeVideos = () => {
  return new Promise(resolve => {
    return fetch(config.videos_url)
      .then(response => response.json())
      .then(json => resolve(json));
  });
};

module.exports = {
  getLatestWorkshop,
  getYoutubeVideos
};
