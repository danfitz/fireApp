const { Router } = require('express')
const { pool } = require('../../db')

const router = Router()

router.get('/users/:username', (req, res) => {
  const username = req.params.username
  
  const query = `SELECT
    username,
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

module.exports = router