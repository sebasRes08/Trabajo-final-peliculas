const {Router} = require ('express');
const tipo = require ('../models/tipo');
const {validationResult, check} = require ('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('descripcion','invalid.descripcion').not().isEmpty()

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let tipo = new tipo();
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaCreacion = new Date;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save();

        res.send(tipo);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error')
    }

  });

  router.get('/', async function (req, res)  {
    
    try{
        const tipos = await tipo.find();
        res.send(tipos);
    }catch(error){
        console.long(error);
        res.status(500).send('ocurrio un error')
    }
  })

  router.put('/:tipoId', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('descripcion','invalid.descripcion').not().isEmpty()

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let tipo = await tipo.findById(req.params.tipoId);
        if(!errors.isEmpty()){
            return res.status(400).json('tipo no existe');
        }
        const existetipo= await tipo.findOne({nombre: req.body.nombre, _id: {$ne: tipo._Id }});

        
        tipo.nombre = req.body.nombre;
        tipo.descripcion = req.body.descripcion;
        tipo.fechaActualizacion = new Date;

        tipo = await tipo.save();

        res.send(tipo);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error ')
    }

  });

  module.exports=router;