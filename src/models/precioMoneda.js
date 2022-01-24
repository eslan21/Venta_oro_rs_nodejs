const db = require('../config/configuracion')
const Sequelize = require('sequelize');

const PrecioMoneda = db.define('preciomoneda',{
    id:{
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Bs:Sequelize.FLOAT,
    COL:Sequelize.FLOAT,
    ARG:Sequelize.FLOAT,
    SOL:Sequelize.FLOAT,
    BRL:Sequelize.FLOAT
})

module.exports = PrecioMoneda;