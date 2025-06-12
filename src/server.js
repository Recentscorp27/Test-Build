// src/server.js
const express   = require('express')
const path      = require('path')
const mongoose  = require('mongoose')
const { app, connectDB, logger } = require('./app')
const config    = require('./config')

// 1️⃣ Serve uploads folder so files are publicly accessible
//    e.g. GET /uploads/1593456789123-yourfile.pdf
app.use(
  '/uploads',
  express.static(path.join(__dirname, '../uploads'))
)

// 2️⃣ Mount your Multer-powered upload router
//    POST /api/uploads  (field name: "document")
const uploadRouter = require('./routes/uploads')
app.use('/api/uploads', uploadRouter)

// ————————————————————————————————
// your existing DB + server startup + shutdown logic
;(async () => {
  await connectDB()

  const server = app.listen(
    config.PORT,
    '0.0.0.0',
    () =>
      console.log(
        `Server publicly listening on 0.0.0.0:${config.PORT} (env=${config.NODE_ENV})`
      )
  )

  const shutdown = () => {
    logger.info('Graceful shutdown')
    server.close(() => {
      mongoose.disconnect().then(() => process.exit(0))
    })
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
})()
