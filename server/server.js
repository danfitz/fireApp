require('dotenv').config()
const path = require('path')

const { Client } = require('pg')

// % % %
// * ===== MODULES =====
// % % %
const express = require('express')

// % % %
// * ===== SET UP =====
// % % %
const app = express()

// % % % 
// * ===== ENDPOINTS ======
// % % %
app.get('/api/users', (req, res) => {
  const client = new Client({
    // user: process.env.USER,
    // host: process.env.HOST,
    // database: process.env.DB_NAME,
    // password: process.env.PASSWORD,
    // port: process.env.DB_PORT,
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })

  client.connect()

  client.query('SELECT username, first_name, last_name FROM users;', (error, response) => {
    if (error) {
      console.log(error)
      res.status(500).send('Error!')
      return
    }

    res.send(response.rows)
    client.end()
  })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
  const buildDir = path.join(__dirname, '../client/build')

  app.use(express.static(buildDir))

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