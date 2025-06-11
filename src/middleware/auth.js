const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ success: false, error: 'Missing token' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, config.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
