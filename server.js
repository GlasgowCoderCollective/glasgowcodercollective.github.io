const env = require('dotenv');
const app = require('./app');

if (process.env.NODE_ENV !== 'production') {
  env.config();
}

// TODO: Connect the application to the database

app.listen(process.env.PORT, () => console.log('GCC App has started'));
