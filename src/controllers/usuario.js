const Users = require('../models/usuario');
const Precios = require('../models/precios');

const Sequelize = require('sequelize')
const { Op}  = require("sequelize");
const validacion = require('../helpers/objValidator.js')


exports.ventanaLogin = (req, res)=>{
    res.render('login.html')
}

exports.consultaUsers = async (req,res, next)=>{
    
        const user = await  Users.findOne({
            where: {
                [Op.and]:[
                    {
                        name:req.body.usuario
                    },
                    {
                        password:req.body.password
                    },
                ]
            }
        })
        if(user){
            
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


        } else {
            res.redirect('/login')

        }
        
    
}