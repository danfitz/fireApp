require('dotenv').config()
const path = require('path')

// % % %
// * ===== MODULES =====
// % % %
const express = require('express')

// % % %
// * ===== SET UP & MIDDLEWARE =====
// % % %
const app = express()
app.use(express.json()) // <= body parser

// % % %
// * ===== ROUTES & ENDPOINTS =====
// % % %
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  const buildDir = path.join(__dirname, '../client/build')

  app.use(express.static(buildDir))
// 
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'))
  })
}

// % % %
// * ===== LISTENING =====
// % % %
app.listen(process.env.PORT || 3001, () => {
  console.log('API up!')
})