const Sequelize = require('sequelize')
const db = require('../db')
const { UUID, UUIDV4 } = Sequelize

const Session = db.define('session', {
    uuid: {
        type: UUID,
        defaultValue: UUIDV4
    }
})


module.exports = Session
