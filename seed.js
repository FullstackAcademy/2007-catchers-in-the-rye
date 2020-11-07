const faker = require('faker');
const hash = require('./server/hash');

const {
  db, Category, Costume, Order, User, Session,
} = require('./server/db');

const categories = [
  { title: 'Animals' },
  { title: 'Disney' },
  { title: 'Monsters' },
  { title: 'Superheroes' },
];

const materials = ['100% polyester', '50% cotton, 50% polyester', '100% polyurethane foam', '100% cotton', '100% nylon', '100% acrylic'];
const discounts = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7];


const costumes = [
  {
    costumeName: 'Bumble Bee',
    price: 14.99,
    categoryId: 1,
    imageUrl: '/costumeImages/animals/bee.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Crab',
    price: 69.99,
    categoryId: 1,
    imageUrl: '/costumeImages/animals/crab.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Dilophosaurus',
    price: 59.99,
    categoryId: 1,
    imageUrl: '/costumeImages/animals/dilophosaurus.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Ostrich',
    price: 54.99,
    categoryId: 1,
    imageUrl: '/costumeImages/animals/ostrich.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Turkey',
    price: 54.99,
    categoryId: 1,
    imageUrl: '/costumeImages/animals/turkey.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Tiana',
    price: 199.99,
    categoryId: 2,
    imageUrl: '/costumeImages/disney/tiana.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Aladdin',
    price: 199.99,
    categoryId: 2,
    imageUrl: '/costumeImages/disney/aladdin.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Elsa',
    price: 159.99,
    categoryId: 2,
    imageUrl: '/costumeImages/disney/elsa.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Finding Nemo',
    price: 299.99,
    categoryId: 2,
    imageUrl: '/costumeImages/disney/findingNemo.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Werewolf',
    price: 52.99,
    categoryId: 3,
    imageUrl: '/costumeImages/monsters/werewolf.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Creature from the Black Lagoon',
    price: 299.99,
    categoryId: 3,
    imageUrl: '/costumeImages/monsters/blackLagoon.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Frankenstein\'s Monster',
    price: 74.99,
    categoryId: 3,
    imageUrl: '/costumeImages/monsters/frankenstein.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Mummy',
    price: 46.99,
    categoryId: 3,
    imageUrl: '/costumeImages/monsters/mummy.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Vampire',
    price: 44.99,
    categoryId: 3,
    imageUrl: '/costumeImages/monsters/vampire.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Wonder Woman',
    price: 109.99,
    categoryId: 4,
    imageUrl: '/costumeImages/superheros/wonderWoman.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Captain America',
    price: 99.99,
    categoryId: 4,
    imageUrl: '/costumeImages/superheros/captainAmerica.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Black Widow',
    price: 79.99,
    categoryId: 4,
    imageUrl: '/costumeImages/superheros/blkWidow.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
  },
  {
    costumeName: 'Black Panther',
    price: 79.99,
    categoryId: 4,
    imageUrl: '/costumeImages/superheros/blackPanther.jpg',
    material: materials[Math.floor(Math.random() * (materials.length - 1))],
    discount: discounts[Math.floor(Math.random() * (discounts.length - 1))],
    madeIn: faker.address.country(),
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
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      },
    );
  } else {
    orders.push(
      {
        isPaid: true,
        shippingAddress: faker.address.streetAddress(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
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
      let rand = Math.floor(Math.random() * (costumesCreated.length - 1));
      await ordersCreated[i].setCostumes([costumesCreated[rand], costumesCreated[rand + 1]]);
    }
    // calculate total for each order from costumes
    for (let i = 0; i < ordersCreated.length; i++) {
      const order = ordersCreated[i];
      await order.calcTotal();
    }

    await db.close();
    console.log('seeded');
  } catch (err) { console.error(err); }
};

seed();
