const { Router } = require('express')
const { pool } = require('../../db')

const router = Router()

router.get('/investments/:username', (req, res) => {
  const username = req.params.username
  
  const query = `SELECT id, type, amount FROM "Investment" WHERE username='${username}';`

  pool.query(query)
    .then(response => res.send({ investments: response.rows }))
    .catch(error => res.status(500).send({ error }))
})

router.post('/investments/:username', (req, res) => {
  const username = req.params.username
  const updatedInvestment = {
    type: req.body.data.type,
    amount: req.body.data.amount
  }
  const id = req.body.data.id
  
  const query = `UPDATE "Investment" SET
    ${Object.entries(updatedInvestment)
      .map(([key, val]) => `${key}='${val}'`)
      .join(',')}
  WHERE username='${username}' AND id='${id}'
  RETURNING
    id,
    type,
    amount;
  `

  pool.query(query)
    .then(response => res.send({ user: response.rows[0] }))
    .catch(error => res.status(500).send({ error }))
})

module.exports = router

module.exports = router