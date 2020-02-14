const { Router } = require('express')

const router = Router()

router.use(require('./investments'))

module.exports = router