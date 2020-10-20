//import your db
const { db } = require('./db')
//import your models
const { Example } = require('./models/Example')
const { Example2 } = require('./models/Example2')
const { NamedModulesPlugin } = require('webpack')

//state your model associations (hasOne etc)

//export your db and Models (so they all can be imported from a single central location)
module.exports = { db, Example, Example2 }