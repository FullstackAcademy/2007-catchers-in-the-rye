const Sequelize = require('sequelize');
const db = require('../db');

const {
  STRING, BOOLEAN, DECIMAL, ENUM,
} = Sequelize;

const Order = db.define('order', {
  isPaid: {
    type: BOOLEAN,
    defaultValue: false,
  },
  total: {
    type: DECIMAL(10, 2),
    defaultValue: 0,
  },
  shippingAddress: {
    type: STRING,
  },
  isShipped: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

Order.prototype.calcTotal = async function () {
  const thisOrderCostumes = await this.getCostumes();
  this.total = thisOrderCostumes.reduce((acc, costume) => {
    acc += costume.price * costume.lineitem.quantity;
    return acc;
  }, 0);
  await this.save();
};

module.exports = Order;
