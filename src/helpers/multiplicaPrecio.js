module.exports  = function(obj,dolar){
    const valores = Object.keys(obj)
    let newObject={};
    valores.forEach(arr =>{
        newObject[arr] = Number((obj[arr]*dolar).toFixed(2))
    })
    return newObject
}