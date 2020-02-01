const app = require('express')();
const enforce = require('express-sslify');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');

const clientPath = path.resolve(__dirname, 'client');
const publicPath = path.resolve(__dirname, 'public');
const apiRouter = require('./routes/api');

// Force https if in production
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(require('express').static(publicPath));

app.get('/', (req, res) => res.sendFile(`${clientPath}/index.html`));

app.use('/api', apiRouter);

app.all('*', (req, res) => res.status(404).json({ error: true, message: 'No endpoint found' }));

module.exports = app;
