const { Router } = require('express')
const { pool } = require('../../db')

const router = Router()

router.get('/users/:username', (req, res) => {
  const username = req.params.username
  
  const query = `SELECT
    first_name,
    last_name,
    birthday,
    roi,
    withdrawal_rate,
    inflation_rate,
    posttax_income
  FROM "User"
  WHERE username='${username}'
  LIMIT 1;
  `

  pool.query(query)
    .then(response => res.send({ user: response.rows[0] }))
    .catch(error => res.status(500).send({ error }))
})

router.post('/users/:username', (req, res) => {
  const username = req.params.username
  const updatedUser = req.body.data
  
  const query = `UPDATE "User" SET
    ${Object.entries(updatedUser)
      .map(([key, val]) => `${key}='${val}'`)
      .join(',')}
  WHERE username='${username}'
  RETURNING
    first_name,
    last_name,
    birthday,
    roi,
    withdrawal_rate,
    inflation_rate,
    posttax_income;
  `

  pool.query(query)
    .then(response => res.send({ user: response.rows[0] }))
    .catch(error => res.status(500).send({ error }))
})

module.exports = router