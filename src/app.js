const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const pino = require('pino');
const config = require('./config');
const authRoutes = require('./routes/auth');

const logger = pino();
const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginResourcePolicy: { policy: 'same-site' }
}));
app.use(cors({ origin: config.CLIENT_URL }));
app.use(morgan('combined'));
app.use(compression());
app.use(express.json({ limit: '100kb' }));

app.use('/api/v1/auth', authRoutes);
app.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }));

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not found' });
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Internal Server Error' });
});

async function connectDB() {
  await mongoose.connect(config.MONGODB_URI);
}

module.exports = { app, connectDB, logger };
