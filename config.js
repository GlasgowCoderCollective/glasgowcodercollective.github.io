const latestWorkshopUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=PLwewcoGnsFsfF186l11QcDLquwkACOfjW&fields=items(snippet(description%2CresourceId%2FvideoId%2Cthumbnails%2Fstandard%2Furl%2Ctitle))&key=${process.env.YOUTUBE_KEY}`;
const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCW1GG-QroKAV5No7xzVssJw&maxResults=25&order=date&fields=items(id%2FvideoId%2Csnippet(description%2Ctitle))&key=${process.env.YOUTUBE_KEY}`;

module.exports = {
  latestWorkshopUrl,
  videosUrl,
};
