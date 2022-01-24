const Sequelize =  require('sequelize')
const db = require('../config/configuracion.js');

const User = db.define('user',{
    id:{
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    name: {
       type: Sequelize.STRING,
       allowNull: false
       
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }

})


module.exports = User;