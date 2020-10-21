const Sequelize = require("sequelize") //for things like Sequelize.STRING
//import your db
const { db } = require('../db')
const { STRING, FLOAT, INTEGER } = Sequelize
//define your model
//avg rating would be a calcuation not field
const Costume = db.define('costume', {
    costumeName: {
        type: STRING
    },
    price: {
        type: FLOAT
    },
    quantity: {
        type: INTEGER
    }
    // averageRating: {
    //     type: INTEGER,
    //     validate: {
    //         max: 5,
    //         min: 1
    //     }
    // }
})
//define any class or instance methods

//export your model
module.exports = { Costume }