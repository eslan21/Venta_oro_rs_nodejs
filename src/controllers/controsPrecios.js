const Sequelize = require('sequelize')
const path = require('path');
const Precios = require('../models/precios');
const validacion = require('../helpers/objValidator.js')
const PrecioMoneda = require('../models/precioMoneda')
const muntiplcacion = require('../helpers/multiplicaPrecio');
const { Console } = require('console');



/****************************   PAGINA INICIO   ***************** */
exports.principal = async (req,res)=>{
   
    const preciosActuales = await Precios.findAll()

   
    
    res.render('index.html')
};




/****************************   SUBMIT PRECIOS RS  ***************** */

exports.actualizarPrecio =async (req,res)=>{
    
    
  
    let rsOldValues =  {
            valorMDolar:req.body.valorMDolarOLD,
            valorMBs:req.body.valorMBsOLD,
            valorMArg:req.body.valorMArgOLD,
            valorMCol:req.body.valorMColOLD,
            valorMSol:req.body.valorMSolOLD,
            valorMBzl:req.body.valorMBzlOLD
    }
    let rs3Values = {
        valorMDolar:req.body.valorMDolar3,
         valorMBs:req.body.valorMBs3 ,
        valorMArg:req.body.valorMArg3,
        valorMCol:req.body.valorMCol3,
        valorMSol:req.body.valorMSol3,
        valorMBzl:req.body.valorMBzl3 
    }
    //validacion
    let rsOldValuesR = validacion(rsOldValues)
    let rs3ValuesR = validacion(rs3Values)
    
    
    await Precios.update(rsOldValuesR, {
        where: {
            tipoDeJuego:'rsOld'
        }
    })   
    await Precios.update(rs3ValuesR, {
        where: {
            tipoDeJuego:'rs3'
        }
    })  
    const preciosActuales = await Precios.findAll()
    
  
    
    res.render('precios.html',{preciosActuales})
   
    
}

exports.consulta = async (req,res)=>{
    const precios = await Precios.findAll();
    res.json(precios)
}

/****************************   SUBMIT PARA ACTUALIZAR POR DOLAR ***************** */

exports.actualizarDolar = async (req,res)=>{
    const dolaresRSOLD = req.body.dolaresRSOLD
    const dolaresRS3 = req.body.dolaresRS3
    const consutaDolares =   await PrecioMoneda.findOne({where:{id:1}}) 
    if(!consutaDolares){
        await PrecioMoneda.create({
            Bs:0,
            COL:0,
            ARG:0,
            SOL:0,
            BRL:0
        })
        consutaDolares = await PrecioMoneda.findOne({where:{id:1}})

    }
    const moneda = consutaDolares.dataValues
    const newValuesRSOLD = muntiplcacion(moneda,dolaresRSOLD)
    const newValuesRS3 = muntiplcacion(moneda,dolaresRS3)
   
    let rsOldValues =  {
        valorMDolar:dolaresRSOLD,
        valorMBs:newValuesRSOLD.Bs,
        valorMArg:newValuesRSOLD.ARG,
        valorMCol:newValuesRSOLD.COL,
        valorMSol:newValuesRSOLD.SOL,
        valorMBzl:newValuesRSOLD.BRL
    }
    let rs3Values = {
        valorMDolar:dolaresRS3,
        valorMBs:newValuesRS3.Bs,
        valorMArg:newValuesRS3.ARG,
        valorMCol:newValuesRS3.COL,
        valorMSol:newValuesRS3.SOL,
        valorMBzl:newValuesRS3.BRL
    }
    //validacion
    let rsOldValuesR = validacion(rsOldValues)
    let rs3ValuesR = validacion(rs3Values)
    

    await Precios.update(rsOldValuesR, {
        where: {
            tipoDeJuego:'rsOld'
        }
    })   
    await Precios.update(rs3ValuesR, {
        where: {
            tipoDeJuego:'rs3'
        }
    }) 
    const preciosActuales = await Precios.findAll()
    
  
    
    res.render('precios.html',{preciosActuales})

    
}


/****************************   SUBMIT PARA ACTUALIZAR A CUANTO EQUIVALE EL DOLAR EN LAR OTRAS MONEDAS ***************** */

exports.dolarEnOtrasMonedas = async (req,res,next) =>{
    const validar = await PrecioMoneda.findOne({where:{id:1}})
    if(!validar){
        await PrecioMoneda.create({
            Bs:0,
            COL:0,
            ARG:0,
            SOL:0,
            BRL:0
        })
     validar = await PrecioMoneda.findOne({where:{id:1}})

    }
    const {Bs,COL,ARG,SOL,BRL} = req.body
    const actualizacion = {
        Bs:Bs,
        COL:COL,
        ARG:ARG,
        SOL:SOL,
        BRL:BRL
    }
   await PrecioMoneda.update(actualizacion,{
        where:{id:1}
    })
    
   next()
}