const faker = require('faker');
const hash = require('./server/hash');

const {
  db, Category, Costume, Order, User, Session,
} = require('./server/db');

const categories = [
  { title: 'Disney' },
  { title: 'Adult' },
  { title: 'Villains' },
  { title: 'Inanimate objects' },
  { title: 'Superheroes' },
  { title: 'Animals' },
  { title: 'Monsters' },
];

const costumes = [
  {
    costumeName: 'Cinderella',
    price: 199.99,
    categoryId: 1,
  },
  {
    costumeName: 'Elsa',
    price: 159.99,
    categoryId: 1,
  },
  {
    costumeName: 'Mrs. Potts',
    price: 299.99,
    categoryId: 1,
  },
  {
    costumeName: 'Hot nun',
    price: 99.99,
    categoryId: 2,
  },
  {
    costumeName: 'Hot nurse',
    price: 89.99,
    categoryId: 2,
  },
  {
    costumeName: 'Hot computer programmer',
    price: 109.99,
    categoryId: 2,
  },
  {
    costumeName: 'Joker',
    price: 39.99,
    categoryId: 3,
  },
  {
    costumeName: 'Devil',
    price: 6.66,
    categoryId: 3,
  },
  {
    costumeName: 'Man',
    price: 12.99,
    categoryId: 3,
  },
  {
    costumeName: 'Stapler',
    price: 1.99,
    categoryId: 4,
  },
  {
    costumeName: 'Pickle Moustache Guy',
    price: .79,
    categoryId: 4,
  },
  {
    costumeName: 'Cactus',
    price: 19.99,
    categoryId: 4,
  },
  {
    costumeName: 'Wonder Woman',
    price: 109.99,
    categoryId: 5,
  },
  {
    costumeName: 'Captain America',
    price: 99.99,
    categoryId: 5,
  },
  {
    costumeName: 'Black Widow',
    price: 79.99,
    categoryId: 5,
  },
  {
    costumeName: 'Hot Dog',
    price: 24.99,
    categoryId: 6,
  },
  {
    costumeName: 'Lion',
    price: 22.99,
    categoryId: 6,
  },
  {
    costumeName: 'Cowboy Riding a Pet',
    price: 18.99,
    categoryId: 6,
  },
  {
    costumeName: 'Werewolf',
    price: 52.99,
    categoryId: 7,
    imageUrl: '/costumeImages/monsters/werewolf.jpg',
  },
  {
    costumeName: 'Creature from the Black Lagoon',
    price: 299.99,
    categoryId: 7,
    imageUrl: '/costumeImages/monsters/blackLagoon.jpg',
  },
  {
    costumeName: 'Frankenstein\'s Monster',
    price: 74.99,
    categoryId: 7,
    imageUrl: '/costumeImages/monsters/frankenstein.jpg',
  },
  {
    costumeName: "Mummy",
    price: 46.99,
    categoryId: 7,
    imageUrl: '/costumeImages/monsters/mummy.jpg',
  },
  {
    costumeName: "Vampire",
    price: 44.99,
    categoryId: 7,
    imageUrl: '/costumeImages/monsters/vampire.jpg',
  },
];

const users = [
  {
    userType: 'admin',
    firstName: 'Cynthia',
    lastName: 'Ellison',
    userEmail: 'Cynthia8499@hotmail.com',
    username: 'CynthiaEllison',
    password: '',
  },
  {
    userType: 'admin',
    firstName: 'Fu',
    lastName: 'Goto',
    userEmail: 'fu.goto@gmail.com',
    username: 'FuGoto',
    password: '',
  },
  {
    userType: 'admin',
    firstName: 'Mark',
    lastName: 'Guinn',
    userEmail: 'mxavier927@gmail.com',
    username: 'MarkGuinn',
    password: '',
  },
  {
    userType: 'admin',
    firstName: 'Doug',
    lastName: 'Miller',
    userEmail: 'djmiller1717@gmail.com',
    username: 'DougMiller',
    password: '',
  },
];
while (users.length < 20) {
  users.push(
    {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userEmail: faker.internet.email(),
      username: faker.internet.userName(),
      password: '',
    },
  );
}

const orders = [];
while (orders.length < 10) {
  if (orders.length % 2 === 0) {
    orders.push(
      {
        shippingAddress: faker.address.streetAddress(),
      },
    );
  } else {
    orders.push(
      {
        isPaid: true,
        shippingAddress: faker.address.streetAddress(),
      },
    );
  }
}

const sessions = [];
while (sessions.length < 20) {
  sessions.push(
    {
      uuid: faker.random.uuid(),
    },
  );
}

async function hashPasswords() {
  for (let i = 0; i < users.length; i++) {
    const { username } = users[i];
    users[i].password = await hash(username)
  }
}

const seed = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('seeding');
    await db.sync({ force: true });
    await hashPasswords();
    await Promise.all([
      Category.bulkCreate(categories),
      User.bulkCreate(users),
      Costume.bulkCreate(costumes),
      Order.bulkCreate(orders),
      Session.bulkCreate(sessions),
    ]);
    const [usersCreated, costumesCreated, ordersCreated, sessionsCreated] = await Promise.all([
      User.findAll(),
      Costume.findAll(),
      Order.findAll(),
      Session.findAll(),
    ]);
    // assign a user to each session - while a user can have multiple sessions, for seeding purposes only assigning one
    for (let i = 0; i < usersCreated.length - 1; i++) {
      await sessionsCreated[i].setUser(usersCreated[i]);
    }
    // assign a session to each order - while a user can have multiple orders, for seeding purposes only assigning one order per user, since default setting is not paid (i.e. it's a cart and each user only has one open cart)
    for (let i = 0; i < ordersCreated.length; i++) {
      await ordersCreated[i].setSession(sessionsCreated[i]);
    }
    // assign costumes to each order
    for (let i = 0; i < ordersCreated.length; i++) {
      let rand = Math.floor(Math.random() * (costumesCreated.length-1));
      await ordersCreated[i].setCostumes([costumesCreated[rand], costumesCreated[rand+1]]);
    }
    await db.close();
    console.log('seeded');
  } catch (err) { console.error(err); }
};

seed();
