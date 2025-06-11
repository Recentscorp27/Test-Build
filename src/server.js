const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const compression = require('compression');
const config = require('./config');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json({ limit: '100kb' }));
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: config.nodeEnv === 'production' }
}));

app.use('/api/v1/auth', authRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
