const Sequelize = require("sequelize") //for things like Sequelize.STRING
//import your db
const { db } = require('../db')
const { STRING, BOOLEAN, FLOAT, ENUM } = Sequelize
//define your model
const Order = db.define('order', {
    isPaid: {
        type: BOOLEAN,
        defaultValue: true
    },
    total: {
        type: FLOAT
    },
    paymentMethod: {
        type: ENUM('credit', 'cash'),
        defaultValue: 'credit'
    },
    ccNumber: {
        type: STRING
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