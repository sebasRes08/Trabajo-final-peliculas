const {Router} = require ('express');
const Genero = require ('../models/Genero');
const {validationResult, check} = require ('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion','invalid.descripcion').not().isEmpty()

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let genero = new Genero();
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaCreacion = new Date;
        genero.fechaActualizacion = new Date;

        genero = await genero.save();

        res.send(genero);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error')
    }

  });

  router.get('/', async function (req, res)  {
    
    try{
        const generos = await Genero.find();
        res.send(generos);
    }catch(error){
        console.long(error);
        res.status(500).send('ocurrio un error')
    }
  })

  router.put('/:generoId', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion','invalid.descripcion').not().isEmpty()

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let genero = await Genero.findById(req.params.generoId);
        if(!errors.isEmpty()){
            return res.status(400).json('genero no existe');
        }
        const existeGenero= await Genero.findOne({nombre: req.body.nombre, _id: {$ne: genero._Id }});

        
        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;
        genero.fechaActualizacion = new Date;

        genero = await genero.save();

        res.send(genero);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error ')
    }

  });

  module.exports=router;