const { UUIDV4 } = require('sequelize')
const Sequelize = require('sequelize')
const { db } = require('../db')
const { UUID4 } = Sequelize

const Session = db.define('session', {
    session: {
        type: UUIDV4
    }
})


module.exports = { Session }