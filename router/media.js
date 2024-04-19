const {Router} = require ('express');
const Media = require ('../models/Media');
const {validationResult, check} = require ('express-validator');

const router = Router();
router.post('/', [
    check('serial','invalid.serial').not().isEmpty(),
    check('titulo','invalid.titulo').not().isEmpty(),
    check('sinopsis ','invalid.sinopsis ').not().isEmpty(),
    check('url','invalid.url').not().isEmpty(),
    check('imagen ','invalid.imagen ').not().isEmpty(),
    check('anoDeEstreno ','invalid.anoDeEstreno ').not().isEmpty(),
    check('generoPrincipal ','invalid.generoPrincipal ').not().isEmpty(),
    check('directorPrincipal ','invalid.directorPrincipal ').not().isEmpty(),
    check('productora ','invalid.productora ').not().isEmpty(),
    check('tipo ','invalid.tipo ').not().isEmpty(),
     
    

], async function (req, res)  {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({mensaje:errors.array()})
        }
        const existeserial= await media.findOne({serial: req.body.serial});
        if(existeserial){
        return res.status(500).send('Ya esxiste el serial')
        }
        let media = new Media();
        media.serial=req.body.serial;
media.titulo=req.body.titulo;
media.sinopsis =req.body.sinopsis;
media.url=req.body.url;
media.imagen =req.body.imagen;
media.anoDeEstreno =req.body.anoDeEstreno;
media.generoPrincipal =req.body.generoPrincipal;
media.directorPrincipal =req.body.directorPrincipal; 
media.productora =req.body.productora;
media.tipo =req.body.tipo;
        media.fechaCreacion = new Date;
        media.fechaActualizacion = new Date;

        media = await media.save();

        res.send(media);
    
    }catch(error){
        console-log(error);
        res.status(500).send('ocurrió un error')
    }

  });