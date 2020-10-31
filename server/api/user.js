const router = require('express').Router()
const { User, Order, Costume, Session } = require('../db')

router.get('/', async(req, res, next) => {
    try{
        const users = await User.findAll({ 
            include: [Session],
            attributes: {
                exclude: ['password', 'userEmail']
            }
        })
        res.send(users)
    } catch(err) { 
        next(err) 
    }
})

//commented out for now - we do not need this route given we are using cookies to identify the user
// router.get('/:id', async(req, res, next) => {
//     try{
//         const user = await User.findByPk(req.params.id, {
//             attributes: {
//                 exclude: ['password', 'userEmail']
//             }
//         })
//         res.send(user)
//     } catch(err) {
//         next(err)
//     }
// })


module.exports = router
