const env = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

if (process.env.NODE_ENV !== 'production') {
  env.config();
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    app.listen(process.env.PORT, () => console.log('GCC App has started'));
  })
  .catch((mongooseError) => {
    console.error(mongooseError.message);
    return process.exit(1);
  });
