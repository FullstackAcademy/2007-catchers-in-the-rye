const router = require('express').Router()
const { User, Order, Costume } = require('../db')

router.get('/', async(req, res, next) => {
    try{
        const users = await User.findAll()
        res.send(users)
    } catch(err) { 
        next(err) 
    }
})

router.get('/:id', async(req, res, next) => {
    try{
        const user = await User.findByPk(req.params.id)
        res.send(user)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/cart', async(req, res, next) => {
    try{
        const order = await Order.findAll({
            where: {
                userId: req.params.id,
                isPaid: false,
            }, 
            include: [Costume]
        })
        res.send(order)
    } catch(err) {
        next(err)
    }
})

module.exports = router
