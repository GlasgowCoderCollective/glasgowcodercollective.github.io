const { app } = require('./app');
const { logger } = require('./log/winston');

const PORT = process.env.PORT || 3000;
app.listen(PORT, logger.info(`Server started on port ${PORT}`));
