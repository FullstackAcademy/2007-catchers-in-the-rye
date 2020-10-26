const router = require('express').Router()
const { Order, Costume } = require('../db')

router.get('/', async(req, res, next) => {
    try {
        const orders = await Order.findAll()
        res.send(orders)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, { include: [Costume] })
        res.send(order)
    } catch(err) {
        next(err)
    }
})



module.exports = router
