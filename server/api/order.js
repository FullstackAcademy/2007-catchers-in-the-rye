const router = require('express').Router()
const { Order, Costume, Lineitem } = require('../db')

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

router.put('/userCart', async(req,res,next) => {
    try{
        const userId = req.user.id
        const { costumeId, sign } = req.body
        //i am re-finding the order based on userId here, but may be updated based on how we handle guest. also, we could probably put an orderId on the req.user object or something when user creates an order, so that we can just reference the orderId that references user's cart.
        const userCart = await Order.findOne({
            where: {
                userId,
                isPaid: false,
            }, 
            include: [Costume]
        })
        const orderId = userCart.id
        const lineitem = await Lineitem.findOne({
            where: { costumeId, orderId}
        })
        if (sign === '+') {
            await lineitem.increment('quantity')
        }
        if (sign === '-') {
            await lineitem.decrement('quantity')
            //if quantity is 0 as result of decrement, destroy
            if(!lineitem.quantity) lineitem.destroy()
        }
        if(lineitem) res.send(lineitem)
    }catch(err) {
        next(err)
    }
})

router.delete('/userCart/:costumeId', async(req,res,next) => {
    try{
        const userId = req.user.id
        const costumeId = req.params.costumeId
        const userCart = await Order.findOne({
            where: {
                userId,
                isPaid: false,
            }, 
            include: [Costume]
        })
        const orderId = userCart.id
        console.log(costumeId, orderId)
        const lineitem = await Lineitem.findOne({
            where: { costumeId, orderId }
        })
        await lineitem.destroy()
        res.sendStatus(200)
    }catch(err) {
        next(err)
    }
})

// commented out for now, but we do not need this route anymore given we are using cookies to identify cart
// router.get('/:id', async(req, res, next) => {
//     try {
//         const order = await Order.findByPk(req.params.id, { include: [Costume] })
//         res.send(order)
//     } catch(err) {
//         next(err)
//     }
// })


module.exports = router
