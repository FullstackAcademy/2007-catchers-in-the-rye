const router = require('express').Router()
const { Order, Costume, User } = require('../db')

router.get('/', async(req, res, next) => {
    try {
        const orders = await Order.findAll()
        res.send(orders)
    } catch(err) {
        next(err)
    }
})

router.get('/userCart', async(req,res,next) => {
    try{
        const userId = req.user.id
        const userCart = await Order.findAll({
            where: {
                userId,
                isPaid: false,
            }, 
            include: [Costume]
        })
        res.send(userCart)
    }catch(err) {
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
