const {Router} = require ('express');
const Director = require ('../models/Director');
const {validationResult, check} = require ('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let director = new Director();
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.fechaCreacion = new Date;
        director.fechaActualizacion = new Date;

        director = await director.save();

        res.send(director);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error ')
    }

  });

  router.get('/', async function (req, res)  {
    
    try{
        const directores = await Director.find();
        res.send(directores);
    }catch(error){
        console.long(error);
        res.status(500).send('ocurrio un error')
    }
  })

  router.put('/:DirectorId', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let director = await Director.findById(req.params.DirectorId);
        if(!errors.isEmpty()){
            return res.status(400).json('director no existe');
        }
        const existeDirector= await Director.findOne({nombre: req.body.nombre, _id: {$ne: director._Id }});

        
        director.nombre = req.body.nombre;
        director.estado = req.body.estado;
        director.descripcion = req.body.descripcion;
        director.fechaActualizacion = new Date;

        director = await director.save();

        res.send(director);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error ')
    }

  });
  
  module.exports=router;