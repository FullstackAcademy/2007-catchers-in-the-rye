const router = require("express").Router()

router.use('/users', require('./user'))
router.use('/costumes', require('./costume'))
router.use('/categories', require('./category'))
router.use('/orders', require('./order'))
router.use('/auth', require('./authentication'))

module.exports = router
