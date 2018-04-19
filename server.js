const server = require('express')();
const path = require('path');

const indexRoute = require('./routes/indexRoute');

server.use(require('express').static(path.resolve(__dirname, 'public')));
server.use('/', indexRoute);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log('Server started on port', PORT));