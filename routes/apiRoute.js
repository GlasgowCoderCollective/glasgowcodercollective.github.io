const router = require('express').Router();
const { getWorkshops } = require('../mockdata/workshops');
const { getLatestWorkshop, getYoutubeVideos } = require('../data/youtube/media');

router.get('/workshops', (req, res) => res.json(getWorkshops()));
router.get('/youtube/workshop', async (req, res) => {
  let workshop = {
    title: 'Default Title',
    description: 'Default Description',
    id: 'Default ID',
    thumbnail: 'Default Thumbnail',
  };

  if (process.env.NODE_ENV === 'production') {
    const json = await getLatestWorkshop();

    workshop = {
      title: json.items[0].snippet.title,
      description: json.items[0].snippet.description,
      id: json.items[0].snippet.resourceId.videoId,
      thumbnail: json.items[0].snippet.thumbnails.standard.url,
    };
  }

  res.json(workshop);
});

router.get('/youtube/videos', (req, res) => {
  getYoutubeVideos()
    .then((json) => {
      if (json.items.length > 0) {
        res.json(json.items);
      }
    });
});

module.exports = router;
