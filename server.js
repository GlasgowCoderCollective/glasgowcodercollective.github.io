const server = require('express')();
const path = require('path');

const { removeHeaders } = require('./middleware/headers');
const indexRoute = require('./routes/indexRoute');
const videosRoute = require('./routes/videosRoute');
const apiRoute = require('./routes/apiRoute');

if(process.env.NODE_ENV === 'production') {
  const enforce = require('express-sslify');
  server.use(enforce.HTTPS({ trustProtoHeader: true }));
}

server.use(require('express').static(path.resolve(__dirname, 'public')));
server.use('/', removeHeaders, indexRoute);
server.use('/videos', removeHeaders, videosRoute);
server.use('/api', apiRoute);

server.get('/magic', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'views', 'magic.html'))
);

const PORT = process.env.PORT || 3000;

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log('Server started on port', PORT));
