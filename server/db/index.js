const { db } = require('./db')
const { User } = require('./models/User')
const { Costume } = require('./models/Costume')
const { Category } = require('./models/Category')
const { Order } = require('./models/Order')
const { Session } = require('./models/Session')
const { Lineitem } = require('./models/Lineitem')

const { NamedModulesPlugin } = require('webpack')

Costume.belongsTo(Category)
Category.hasMany(Costume)

User.hasMany(Order)
Order.belongsTo(User)

Costume.belongsToMany(Order, { through: Lineitem })
Order.belongsToMany(Costume, { through: Lineitem })

User.hasOne(Session)
Session.belongsTo(User)

module.exports = { db, User, Costume, Category, Order, Session, Lineitem }
