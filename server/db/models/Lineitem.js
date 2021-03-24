const Sequelize = require('sequelize');
const db = require('../db');

const { INTEGER } = Sequelize;

const Lineitem = db.define('lineitem', {
  quantity: {
    type: INTEGER,
    defaultValue: 1,
  },
});

module.exports = Lineitem;
