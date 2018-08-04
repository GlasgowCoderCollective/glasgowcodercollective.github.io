const router = require("express").Router();
const { getWorkshops } = require("../mockdata/workshops");
const { getLatestWorkshop, getYoutubeVideos } = require('../data/youtube/media');

router.get("/workshops", (req, res) => res.json(getWorkshops()));
router.get("/youtube/workshop", (req, res) => {
    getLatestWorkshop()
        .then(json => {
            const workshop = {
                title: json.items[0].snippet.title,
                description: json.items[0].snippet.description,
                id: json.items[0].snippet.resourceId.videoId,
                thumbnail: json.items[0].snippet.thumbnails.standard.url
            }

            res.json(workshop);
        });
});

router.get('/youtube/videos', (req, res) => {
    getYoutubeVideos()
        .then(json => {
            if(json.items.length > 0) {
                res.json(json.items);
            }
        });
});

module.exports = router;
