require('dotenv').config()

const { Pool } = require('pg')

// Chose a POOL to allow a reusable amount of clients (default 10)
// https://node-postgres.com/features/pooling
// ! This may need to be re-configured when scaling up
const pool = new Pool({
  // user: process.env.USER,
  // host: process.env.HOST,
  // database: process.env.DB_NAME,
  // password: process.env.PASSWORD,
  // port: process.env.DB_PORT,
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

// ! Catches errors from connected clients to prevent error from
// ! bubbling up and potentially exiting node.js
// Source: https://node-postgres.com/api/pool#events
pool.on('error', (error, client) => {
  console.error(error) // ! This is where logging would go??
})

module.exports = { pool }