const path = require('path');
const dotenvSafe = require('dotenv-safe');
const { cleanEnv, str, num, url } = require('envalid');

dotenvSafe.config({ example: path.resolve(__dirname, '../.env.example') });

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  PORT: num({ default: 3000 }),
  JWT_SECRET: str(),
  MONGODB_URI: str(),
  GHL_API_KEY: str(),
  GHL_BASE_URL: url(),
  CLIENT_URL: str()
});

module.exports = env;
