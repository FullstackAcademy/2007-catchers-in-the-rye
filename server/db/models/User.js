const Sequelize = require("sequelize") //for things like Sequelize.STRING
//import your db
const { db } = require('../db')
const { STRING, ENUM } = Sequelize
//define your model
// no guest for now. we could do more validation on passwords
const User = db.define('user', {
    userType: {
        type: ENUM('admin', 'shopper'),
        defaultValue: 'shopper'
    },
    firstName: {
        type: STRING,
        allowNull: false,
        validation: {
            notEmpty: true
        }
    },
    lastName: {
        type: STRING
    },
    userEmail: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    username: {
        type: STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})
//define any class or instance methods

//export your model
module.exports = { User }