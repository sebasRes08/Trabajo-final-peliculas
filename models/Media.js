const {Schema, model} = require('mongoose');


  const MediaSchema=Schema({
Serial: {
    type:String,
    required: true,
    unique:true
},
Titulo: {
    type:String,
    required: true
} ,
Sinopsis: {
    type:String,
    required: true
},
URL: {
    type:String,
    required: true,
    unique:true
},
Imagen: {
    type:String,
    required: true
},
FechaDeCreación: {
    type:Date,
    required: true
}, 
FechaDeActualización: {
    type:Date,
    required: true
},
AnoDeEstreno: {
    type:Date,
    required: true
},
GeneroPrincipal: {
    type:Schema.Types.ObjectId,
    ref:'Genero',
    required: true
},
DirectorPrincipal: {
    type:Schema.Types.ObjectId,
    ref:'Director',
    required: true
},
Productora: {
    type:Schema.Types.ObjectId,
    ref:'Productora',
    required: true
},
Tipo: {
    type:Schema.Types.ObjectId,
    ref:'Tipo',
    required: true
}

});
module.sports=model("Media", MediaSchema);  