const Sequelize = require('sequelize');
const db = require('../db');

const {
  STRING, BOOLEAN, FLOAT, ENUM,
} = Sequelize;

const Order = db.define('order', {
  isPaid: {
    type: BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: FLOAT,
    defaultValue: 0,
  },
  paymentMethod: {
    type: ENUM('credit', 'cash'),
    defaultValue: 'credit',
  },
  shippingAddress: {
    type: STRING,
  },
  shippingMethod: {
    type: ENUM('ground', 'express'),
    defaultValue: 'ground',
  },
  isShipped: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
