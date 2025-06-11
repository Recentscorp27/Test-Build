const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

// simple in-memory stores (replace with DB in production)
let users = {}; // { username: { passwordHash, totpSecret, claims: [] } }

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
  if (users[username]) return res.status(409).json({ message: 'User exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const totpSecret = speakeasy.generateSecret({ name: `ClaimClimbers (${username})` });
  users[username] = { passwordHash, totpSecret, claims: [] };
  const qrDataURL = await qrcode.toDataURL(totpSecret.otpauth_url);
  res.json({ message: 'registered', qr: qrDataURL });
});

app.post('/api/login', async (req, res) => {
  const { username, password, token } = req.body;
  const user = users[username];
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  const verified = speakeasy.totp.verify({
    secret: user.totpSecret.base32,
    encoding: 'base32',
    token
  });
  if (!verified) return res.status(401).json({ message: 'Invalid token' });
  const accessToken = jwt.sign({ username }, process.env.JWT_SECRET || 'jwtsecret');
  res.json({ message: 'logged in', token: accessToken });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', users: Object.keys(users).length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
