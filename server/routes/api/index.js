const { Router } = require('express')

const router = Router()

router.use(require('./users'))
router.use(require('./investments'))

module.exports = router