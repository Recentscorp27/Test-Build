// src/routes/upload.js
const express = require('express');
const multer  = require('multer');
const path    = require('path');

// store uploads in /uploads, keep original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage });

const router = express.Router();

// POST /api/v1/upload
router.post('/', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file provided' });
  }
  res.json({
    success: true,
    data: {
      filename: req.file.filename,
      path:     `/uploads/${req.file.filename}`
    }
  });
});

module.exports = router;
