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
//currently doing findOne since user should only have one order that is not paid
router.get('/userCart', async(req,res,next) => {
    try{
        console.log(req.cookies)
        const userId = req.user.id
        const userCart = await Order.findOne({
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
