const router = require('express').Router()
const { Category } = require('../db')

router.get('/', async(req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.send(categories)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.id)
        res.send(category)
    } catch(err){
        next(err)
    }
})

module.exports = router