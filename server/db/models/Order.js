const Sequelize = require('sequelize');
const db = require('../db');
const Lineitem = require('./Lineitem');

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
});

Order.beforeValidate(order => {
  const lineitems = Lineitem.findAll({
    where: {
      orderId: order.id,
    },
    include: [Costume],
  });
  order.total = lineitems.reduce((acc, lineitem) => {
    acc += lineitem.
  }, 0)
}

)

module.exports = Order;
