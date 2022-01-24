const Sequelize = require('sequelize');

const db = require('../config/configuracion.js');

const Precios = db.define( 'precios', {
    
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    tipoDeJuego: Sequelize.STRING,
    valorMDolar: Sequelize.FLOAT,  
    valorMBs: Sequelize.FLOAT, 
    valorMArg: Sequelize.FLOAT, 
    valorMCol: Sequelize.FLOAT, 
    valorMSol: Sequelize.FLOAT,
    valorMBzl: Sequelize.FLOAT
    }

);

module.exports = Precios;