const path = require('path');
const dotenvSafe = require('dotenv-safe');

dotenvSafe.config({ example: path.resolve(__dirname, '../.env.example') });

module.exports = {
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  ghlApiKey: process.env.GHL_API_KEY,
  ghlBaseUrl: process.env.GHL_BASE_URL,
  nodeEnv: process.env.NODE_ENV || 'development'
};
