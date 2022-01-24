
const express = require('express');
const router = express.Router();
const controladorProyecto = require('../controllers/controsPrecios');
const controllerUsaer = require('../controllers/usuario')





module.exports = function(){
    router.get('/', controladorProyecto.principal);

    router.get('/consulta', controladorProyecto.consulta)
  
    router.post('/price', controladorProyecto.actualizarPrecio)
    router.get('/login', controllerUsaer.ventanaLogin)
    router.post('/login', controllerUsaer.consultaUsers)
    router.post('/actualizarSengunDolar',controladorProyecto.actualizarDolar)
    router.post('/actualizarMonedas',controladorProyecto.dolarEnOtrasMonedas,controladorProyecto.actualizarPrecio)
    

    return router;
};

