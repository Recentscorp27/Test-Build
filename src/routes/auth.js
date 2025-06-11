const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const rateLimit = require('express-rate-limit');
const User = require('../models/User');
const config = require('../config');

const router = express.Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: 'User exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const totpSecret = speakeasy.generateSecret({ name: `ClaimClimbers (${username})` });
    const user = new User({ username, passwordHash, totpSecret: totpSecret.base32 });
    await user.save();
    const qrDataURL = await qrcode.toDataURL(totpSecret.otpauth_url);
    res.json({ message: 'registered', qr: qrDataURL });
  } catch (err) {
    next(err);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { username, password, token } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const verified = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: 'base32',
      token
    });
    if (!verified) return res.status(401).json({ error: 'Invalid token' });
    const accessToken = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ message: 'logged in', token: accessToken });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
