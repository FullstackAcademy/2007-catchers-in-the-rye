const router = require("express").Router()
const path = require("path")
//import models from /db

//routes go here
router.use('/')

router.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../index.html")
    );


  } catch (error) { next(error) }
})

module.exports = router
