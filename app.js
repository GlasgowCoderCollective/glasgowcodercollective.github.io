const app = require('express')();
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const apiRouter = require('./routes/api');

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.get('/heartbeat', (req, res) => res.json({ error: false, message: 'This app is online' }));

app.use('/api', apiRouter);

app.all('*', (req, res) => res.status(404).json({ error: true, message: 'No endpoint found' }));

module.exports = app;
