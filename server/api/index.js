const router = require("express").Router()
//import models from /db

//routes go here
router.use('/')

router.get('/', async(req,res,next) => {
    try{


    }catch(error) { next(error) }
})

module.exports = router
