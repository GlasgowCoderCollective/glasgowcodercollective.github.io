const router = require("express").Router();
const { getWorkshops } = require("../mockdata/workshops");
const { getLatestWorkshop } = require('../data/youtube/getLatestWorkshop');

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

module.exports = router;
