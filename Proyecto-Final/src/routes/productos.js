const express = require('express');
const { Router } = express;
let router = new Router();
const { getProductOrAll, postProduct, putProduct, deleteProduct } = require('../controllers/productsControllers');

// Rutas
router.get('/:id?', getProductOrAll);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router;