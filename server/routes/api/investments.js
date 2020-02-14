const { Router } = require('express')
const { pool } = require('../../db')

const router = Router()

router.get('/investments/:username', (req, res) => {
  const username = req.params.username
  
  const query = `SELECT * FROM "Investment" WHERE username='${username}';`

  pool.query(query)
    .then(response => res.send({ investments: response.rows }))
    .catch(error => res.status(500).send({ error }))
})

module.exports = router