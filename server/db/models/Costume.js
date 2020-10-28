const Sequelize = require("sequelize") 
const { db } = require('../db')
const { STRING, FLOAT, INTEGER } = Sequelize

//avg rating would be a calcuation not field
const Costume = db.define('costume', {
    costumeName: {
        type: STRING,
        allowNull: false,
        unique: true,
        validation: {
            notEmpty: true
        }
    },
    price: {
        type: FLOAT,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    quantity: {
        type: INTEGER,
        defaultValue: 10
    },
    imageUrl: {
        type: STRING,
        defaultValue: '/notFound.png',
    }
})

module.exports = { Costume }