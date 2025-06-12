// src/routes/upload.js

const express = require('express');
const multer  = require('multer');
const fs      = require('fs');
const path    = require('path');

const router = express.Router();

// 1) Ensure the uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 2) Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename:    (_req, file, cb) => {
    // prefix with timestamp to avoid collisions, replace spaces in names
    const timestamp  = Date.now();
    const safeName   = file.originalname.replace(/\s+/g, '_');
    const uniqueName = `${timestamp}_${safeName}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,  // 10 MB max
  },
  fileFilter: (_req, file, cb) => {
    // optionally only allow certain mime types:
    // if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed'), false);
    cb(null, true);
  }
});

// POST /api/v1/upload
router.post(
  '/', 
  upload.single('file'),      // ← matches name="file" on your form input
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: 'No file provided' });
    }

    const { originalname, filename, size, mimetype } = req.file;
    return res.json({
      success: true,
      data: {
        originalName: originalname,
        filename,
        size,
        mimeType: mimetype,
        url: `/uploads/${filename}`
      }
    });
  }
);

module.exports = router;
