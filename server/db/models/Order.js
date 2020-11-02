const Sequelize = require('sequelize');
const db = require('../db');
const Lineitem = require('./Lineitem');
const Costume = require('./Costume');

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

Order.prototype.calcTotal = async function () {
  // const orders = Order.findAll({ include: [Costume] });
  // orders.map(order => {
  //   order.costumes.map(costume => {
  //     order.total += costume.price * costume.lineitem.quantity;
  //   });
  // });
  const lineitems = await Lineitem.findAll({
    where: {
      orderId: this.id,
    },
    include: [Costume],
  });
  console.log(lineitems);
  // this.total = lineitems.reduce((acc, lineitem) => {
  //   acc += lineitem.quantity * lineitem.costume.price;
  //   return acc;
  // }, 0);
  // this.save();
}

// Order.beforeValidate = (order => {
//   console.log('costumes',order.costumes)
//   order.costumes.map(costume => {
//     order.total += costume.price * costume.lineitem.quantity
//   })
//   order.save()
  // const orders = Order.findAll({ include: [Costume] });
  // orders.map(order => {
  //   order.costumes.map(costume => {
  //     order.total += costume.price * costume.lineitem.quantity;
  //   });
  // });
  // const lineitems = Lineitem.findAll({
  //   where: {
  //     orderId: order.id,
  //   },
  //   include: [Costume],
  // });
  // order.total = lineitems.reduce((acc, lineitem) => {
  //   acc += lineitem.
  // }, 0)
// });

module.exports = Order;
