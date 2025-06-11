const http = require('http');
const mongoose = require('mongoose');
const { app, connectDB, logger } = require('./app');
const config = require('./config');

(async () => {
  await connectDB();
  const server = http.createServer(app);
  server.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`));

  const shutdown = () => {
    logger.info('Graceful shutdown');
    server.close(() => {
      mongoose.disconnect().then(() => process.exit(0));
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
})();
