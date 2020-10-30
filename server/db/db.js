const Sequelize = require("sequelize")
//initialize your db, don't forget to include the possible heroku database URL
// ********replace Database name in postgres link
const databaseUrl = process.env.DATABASE_URL || 'postgres:localhost:5432/grace-shopper-catchers'
//export your db
const db = new Sequelize(databaseUrl, {
    logging: false,
    operatorsAliases: false,
    operatorsAliases: 0
})


//customize below


module.exports = { db }
