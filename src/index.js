const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const db = require('./config/configuracion')
require('./models/precios')
require('./models/usuario')
require('./models/precioMoneda')
require('dotenv').config({path : 'variable.env'})


const routers = require('./routers')


//INICIANDO SERVIDOR
db.sync()
    .then(()=>console.log('Conectacdo al servidor'))
    .catch(error => console.log(error));
//----------------------------------------------------

//aRCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname,'./public')))
//-+------------------------------

//RUTAS-
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, './views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs');

app.use('/', routers())


//-----------------------------------------------------------
 const host = process.env.HOST || '0.0.0.0';
 const port = process.env.PORT || 3000;
app.listen(port,host, ()=>{
    console.log('server on')
})