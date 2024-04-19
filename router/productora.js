const {Router} = require ('express');
const productora = require ('../models/productora');
const {validationResult, check} = require ('express-validator');

const router = Router();

router.post('/', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion','invalid.descripcion').not().isEmpty(),
    check('slogan','invalid.slogan').not().isEmpty()


], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let productora = new productora();
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.descripcion = req.body.descripcion;
        productora.fechaCreacion = new Date;
        productora.fechaActualizacion = new Date;
        productora.slogan = req.body.slogan;

        productora = await productora.save();

        res.send(productora);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error')
    }

  });

  router.get('/', async function (req, res)  {
    
    try{
        const productoras = await productora.find();
        res.send(productoras);
    }catch(error){
        console.long(error);
        res.status(500).send('ocurrio un error')
    }
  })

  router.put('/:productoraId', [
    check('nombre','invalid.nombre').not().isEmpty(),
    check('estado','invalid.estado').isIn(['Activo','Inactivo']),
    check('descripcion','invalid.descripcion').not().isEmpty(),
    check('slogan','invalid.slogan').not().isEmpty()

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        let productora = await productora.findById(req.params.productoraId);
        if(!errors.isEmpty()){
            return res.status(400).json('productora no existe');
        }
        const existeproductora= await productora.findOne({nombre: req.body.nombre, _id: {$ne: productora._Id }});

        
        productora.nombre = req.body.nombre;
        productora.estado = req.body.estado;
        productora.descripcion = req.body.descripcion;
        productora.slogan = req.body.slogan;

        productora.fechaActualizacion = new Date;

        productora = await productora.save();

        res.send(productora);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error ')
    }

  });

  module.exports=router;