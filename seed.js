const { db, Category, Costume, Order, User } = require ('./server/db')
const faker = require('faker')

const categories = [
    { title: 'Disney'},
    { title: 'Adult' },
    { title: 'Villains' },
    { title: 'Inanimate objects' }
]

const seed = async() => {
    try {
        console.log('seeding')
        await db.sync({ force: true })
        await Category.bulkCreate(categories)
        await db.close()
        console.log('seeded')
    } catch(err) { console.error(err) }
}

seed()