const app = require('express')();
const path = require('path');

const { removeHeaders } = require('./middleware/headers');
const indexRoute = require('./routes/indexRoute');
const videosRoute = require('./routes/videosRoute');
const apiRoute = require('./routes/apiRoute');

// Force https if in production
if(process.env.NODE_ENV === 'production') {
  const enforce = require('express-sslify');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Set up public directory
app.use(require('express').static(path.resolve(__dirname, 'public')));
// Remove sensitive headers
app.use(removeHeaders);
// Set up endpoints
app.use('/', indexRoute);
app.use('/videos', videosRoute);
app.use('/api', apiRoute);
// The 'magic' endpoint
app.get('/magic', (req, res) => res.sendFile(path.resolve(__dirname, 'views', 'magic.html')));

module.exports = { app };