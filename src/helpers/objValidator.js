module.exports = function validacion(obj){
    let newObj = {};
     let arra =  Object.keys(obj);
     
     arra.forEach(arr=>{
         if(obj[arr]!==''){
            newObj[arr] = obj[arr];
         }
     })
   
      return newObj;
}