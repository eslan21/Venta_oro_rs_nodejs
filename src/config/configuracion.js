const Sequelize = require('sequelize');
require('dotenv').config({path: 'variable.env'})
const proces = process.env
const db = new Sequelize(proces.DB_NOMBRE, proces.DB_USER, proces.DB_PASS, {
    host: proces.DB_HOST,
    dialect:  'mysql',
    port: proces.DB_PORT,

    define: {
        timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });


module.exports = db;