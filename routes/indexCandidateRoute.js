const router = require("express").Router();
const path = require("path");

const indexCandidateView = path.resolve(
  __dirname,
  "..",
  "views",
  "index-candidate.html"
);

router.get("/", (req, res) => res.sendFile(indexCandidateView));

module.exports = router;
