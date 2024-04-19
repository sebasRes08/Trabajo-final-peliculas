const express = require('express');
const { getConnection } = require('./db/db-connect-mongo');
const cors = require('cors');
require('dotenv').config();

const router = express();
const port = process.env.PORT;

router.use(cors());
getConnection();

router.use(express.json());

router.use('/genero', require('./router/genero'));
router.use('/director', require('./router/director'));
router.use('/productora', require('./router/productora'));
router.use('/tipo', require('./router/tipo'));
router.use('/media', require('./router/media'));

router.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });

