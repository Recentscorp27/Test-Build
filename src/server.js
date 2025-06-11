const mongoose = require('mongoose');
const { app, connectDB, logger } = require('./app');
const config = require('./config');

(async () => {
  await connectDB();
  const server = app.listen(config.PORT, '0.0.0.0', () => {
    console.log(`Server publicly listening on 0.0.0.0:${config.PORT} (env=${config.NODE_ENV})`);
  });

  const shutdown = () => {
    logger.info('Graceful shutdown');
    server.close(() => {
      mongoose.disconnect().then(() => process.exit(0));
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
})();
