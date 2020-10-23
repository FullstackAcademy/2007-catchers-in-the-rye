const router = require('express').Router()
const { User } = require('../db')

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

module.exports = router
