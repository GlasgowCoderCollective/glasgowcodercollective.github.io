const { app } = require('./app');

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Server started on port', PORT));
