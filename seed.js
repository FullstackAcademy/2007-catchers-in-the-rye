const { db, Category, Costume, Order, User } = require ('./server/db')
const faker = require('faker')

const categories = [
    { title: 'Disney'},
    { title: 'Adult' },
    { title: 'Villains' },
    { title: 'Inanimate objects' },
    { title: 'Superheroes' },
    { title: 'Pets' },
    { title: 'Monsters' },
]

const costumes = [
    {
        costumeName: 'Cinderella',
        price: 199.99,
        categoryId: 1
    },
    {
        costumeName: 'Elsa',
        price: 159.99,
        categoryId: 1
    },
    {
        costumeName: 'Mrs. Potts',
        price: 299.99,
        categoryId: 1
    },
    {
        costumeName: 'Hot nun',
        price: 99.99,
        categoryId: 2
    },
    {
        costumeName: 'Hot nurse',
        price: 89.99,
        categoryId: 2
    },
    {
        costumeName: 'Hot computer programmer',
        price: 109.99,
        categoryId: 2
    },
    {
        costumeName: 'Joker',
        price: 39.99,
        categoryId: 3
    },
    {
        costumeName: 'Devil',
        price: 6.66,
        categoryId: 3
    },
    {
        costumeName: 'Man',
        price: 12.99,
        categoryId: 3
    },
    {
        costumeName: 'Stapler',
        price: 1.99,
        categoryId: 4
    },
    {
        costumeName: 'Pickle Moustache Guy',
        price: .79,
        categoryId: 4
    },
    {
        costumeName: 'Cactus',
        price: 19.99,
        categoryId: 4
    },
    {
        costumeName: 'Wonder Woman',
        price: 109.99,
        categoryId: 5
    },
    {
        costumeName: 'Captain America',
        price: 99.99,
        categoryId: 5
    },
    {
        costumeName: 'Black Widow',
        price: 79.99,
        categoryId: 5
    },
    {
        costumeName: 'Hot Dog',
        price: 24.99,
        categoryId: 6
    },
    {
        costumeName: 'Lion',
        price: 22.99,
        categoryId: 6
    },
    {
        costumeName: 'Cowboy Riding a Pet',
        price: 18.99,
        categoryId: 6
    },
    {
        costumeName: 'Werewolf',
        price: 49.99,
        categoryId: 7
    },
    {
        costumeName: 'Creature from the Black Lagoon',
        price: 159.99,
        categoryId: 7
    },
    {
        costumeName: 'Frankenstein',
        price: 39.99,
        categoryId: 7
    },
    {
        costumeName: "Frankenstein's Monster",
        price: 109.99,
        categoryId: 7
    },
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

const orders = []
while(orders.length < 5){
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
        // assign a user to each order - while a user can have multiple orders, for seeding purposes only assigning one order per user, since default setting is not paid (i.e. it's a cart and each user only has one open cart)
        for(let i = 0; i < ordersCreated.length; i++){
            await ordersCreated[i].setUser(usersCreated[i])
        }
        // assign costumes to each order
        for(let i = 0; i < ordersCreated.length; i++){
            let rand = Math.floor(Math.random() * (costumesCreated.length-1))
            await ordersCreated[i].setCostumes([costumesCreated[rand], costumesCreated[rand+1]])
        }

        await db.close()
        console.log('seeded')
    } catch(err) { console.error(err) }
}

seed()