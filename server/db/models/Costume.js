const Sequelize = require('sequelize');
const db = require('../db');

const { STRING, FLOAT, INTEGER, DECIMAL } = Sequelize;

const Costume = db.define('costume', {
  costumeName: {
    type: STRING,
    allowNull: false,
    unique: true,
    validation: {
      notEmpty: true,
    },
  },
  price: {
    type: FLOAT,
    allowNull: false,
    validation: {
      notEmpty: true,
    },
  },
  quantity: {
    type: INTEGER,
    defaultValue: 10,
  },
  imageUrl: {
    type: STRING,
    defaultValue: '/costumeImages/notFound.png',
  },
  material: {
    type: STRING,
  },
  oldPrice: {
    type: DECIMAL(10, 2),
  },
});

module.exports = Costume;
