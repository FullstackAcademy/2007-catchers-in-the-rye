const { db, Category, Costume, Order, User } = require ('./server/db')
const faker = require('faker')

const categories = [
    { title: 'Disney'},
    { title: 'Adult' },
    { title: 'Villains' },
    { title: 'Inanimate objects' }
]

const users = []
while(users.length < 20) {
    users.push(
      {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userEmail: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
    )
}

const costumes = [
    {
        costumeName: 'Cinderella',
        price: 199.99,
        categoryId: 1
    },
    {
        costumeName: 'Hot nun',
        price: 99.99,
        categoryId: 2
    },
    {
        costumeName: 'Joker',
        price: 39.99,
        categoryId: 3
    },
    {
        costumeName: 'Stapler',
        price: 1.99,
        categoryId: 4
    },
]

const orders = []
while(orders.length <= 5){
    orders.push(
        { 
            total: faker.finance.amount(),
            ccNumber: faker.finance.creditCardNumber(),
            shippingAddress: faker.address.streetAddress()
        }
    )  
}

const seed = async() => {
    try {
        console.log('seeding')
        await db.sync({ force: true })
        await Category.bulkCreate(categories)
        await User.bulkCreate(users)
        await Costume.bulkCreate(costumes)
        await Order.bulkCreate(orders)

        const usersCreated = await User.findAll()
        const ordersCreated = await Order.findAll()
        const costumesCreated = await Costume.findAll()
        // assign a user to each order
        for(let i = 0; i < ordersCreated.length; i++){
            let rand = Math.floor(Math.random() * usersCreated.length)
            await ordersCreated[i].setUser(usersCreated[rand])
        }

        // assign costumes to each order
        for(let i = 0; i < ordersCreated.length; i++){
            let rand = Math.floor(Math.random() * costumesCreated.length)
            await ordersCreated[i].setCostumes(costumesCreated[rand])
        }

        await db.close()
        console.log('seeded')
    } catch(err) { console.error(err) }
}

seed()