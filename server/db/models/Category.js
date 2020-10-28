const Sequelize = require("sequelize")
const { db } = require('../db')
const { STRING } = Sequelize

const Category = db.define('category', {
    title: {
        type: STRING,
        allowNull: false,
        unique: true,
        validation: {
            notEmpty: true
        }
    }
})

module.exports = { Category }