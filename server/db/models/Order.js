const Sequelize = require("sequelize") //for things like Sequelize.STRING
//import your db
const { db } = require('../db')
const { STRING, BOOLEAN, FLOAT, ENUM, INTEGER } = Sequelize
//define your model
const Order = db.define('order', {
    isPaid: {
        type: BOOLEAN,
        defaultValue: false
    },
    total: {
        type: FLOAT
    },
    paymentMethod: {
        type: ENUM('credit', 'cash')
    },
    ccNumber: {
        type: INTEGER
    },
    shippingAddress: {
        type: STRING
    },
    shippingMethod: {
        type: ENUM('ground', 'express'),
        defaultValue: 'ground'
    }
})

module.exports = { Order }