const db = require('./db')
const User = require('./models/User')
const Costume = require('./models/Costume')
const Category = require('./models/Category')
const Order = require('./models/Order')
const Session = require('./models/Session')
const Lineitem = require('./models/Lineitem')
const TrackedOrder = require('./models/TrackedOrder')

Costume.belongsTo(Category)
Category.hasMany(Costume)

Costume.belongsToMany(Order, { through: Lineitem })
Order.belongsToMany(Costume, { through: Lineitem })

User.hasMany(Session)
Session.belongsTo(User)

Session.belongsToMany(Order, { through: TrackedOrder })
Order.belongsToMany(Session, { through: TrackedOrder })

module.exports = { db, User, Costume, Category, Order, Session, Lineitem }
