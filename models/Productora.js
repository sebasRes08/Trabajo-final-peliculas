const {Schema, model} = require('mongoose');


  const ProductoraSchema=Schema({
    nombre:{type:String,required:true},
    estado:{type:String,required:true,enum:[ "activo","inactivo"]},
    descripcion:{type:String,required:true},
    fechacreacion:{type:Date,required:true},
    fechaActualizacion:{type:Date,required:true}
});
module.sports=model("Productora", ProductoraSchema);  