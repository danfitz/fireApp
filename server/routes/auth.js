const { Router } = require('express')
const { pool } = require('../db')

const router = Router()

router.get('/', (req, res) => {
  // Unpacking basic auth encrypted with base64
  const b64auth = req.headers.authorization.split(' ')[1]
  const [username, password] = new Buffer(b64auth, 'base64').toString().split(':')

  const query = `SELECT * FROM "User" WHERE username='${username}' AND password='${password}';` // ! <= INJECTION ATTACK; NEEDS STORED PROCEDURE

  pool.query(query)
    .then(response => {
      const returnedOneUser = response.rowCount === 1

      res.send({ authenticated: returnedOneUser })
    })
    .catch(error => {
      res.status(500).send({ error }) // ! Error returned needs to be more informative
    })
})

module.exports = router