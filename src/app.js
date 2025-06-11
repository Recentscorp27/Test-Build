const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const session = require('express-session');
const pino = require('pino');
const path = require('path');
const config = require('./config');
const authRoutes = require('./routes/auth');

const logger = pino();
const app = express();
app.set('trust proxy', 1);

app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(cors({
  origin:      config.CLIENT_URL,
  methods:     ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(session({
  secret: config.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'strict'
  }
}));

app.use('/api/v1/auth', authRoutes);
app.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }));

app.use(express.static(path.join(__dirname, '../client/build')));
app.use((req, res) =>
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
);

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
