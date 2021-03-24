const Sequelize = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres:localhost:5432/grace-shopper-catchers';

const db = new Sequelize(databaseUrl, {
  logging: false,
  operatorsAliases: false,
  operatorsAliases: 0,
  dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  }
}
});

module.exports = db;
