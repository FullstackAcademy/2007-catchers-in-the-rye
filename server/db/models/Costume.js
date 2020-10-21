const Sequelize = require("sequelize") //for things like Sequelize.STRING
//import your db
const { db } = require('../db')
const { STRING, FLOAT, INTEGER } = Sequelize
//define your model
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
//define any class or instance methods

//export your model
module.exports = { Costume }