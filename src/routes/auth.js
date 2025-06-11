const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
const userService = require('../services/userService');
const config = require('../config');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required()
});

router.post('/register', authLimiter, asyncHandler(async (req, res) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.message });
  const { username, password } = value;
  const passwordHash = await bcrypt.hash(password, 10);
  const totpSecret = speakeasy.generateSecret({ name: `ClaimClimbers (${username})` });
  const user = await userService.createUser(username, passwordHash, totpSecret.base32);
  const qrDataURL = await qrcode.toDataURL(totpSecret.otpauth_url);
  res.json({ success: true, data: { qr: qrDataURL } });
}));

router.post('/login', authLimiter, asyncHandler(async (req, res) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, error: error.message });
  const { username, password, token } = value;
  const user = await userService.findByUsername(username);
  if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ success: false, error: 'Invalid credentials' });
  const verified = speakeasy.totp.verify({ secret: user.totpSecret, encoding: 'base32', token });
  if (!verified) return res.status(401).json({ success: false, error: 'Invalid token' });
  const accessToken = jwt.sign({ username }, config.JWT_SECRET, { expiresIn: '1h' });
  res.json({ success: true, data: { token: accessToken } });
}));

module.exports = router;
