const express = require('express');
const { Router } = express;
let router = new Router();
const { postCart, deleteCartById, getProductsOnCartById, postProductsOnCartById, deleteProductOfCartById } = require('../controllers/cartsControllers');

router.post('/', postCart);
router.delete('/:id', deleteCartById);
router.get('/:id/productos', getProductsOnCartById);
router.post('/:id/productos', postProductsOnCartById);
router.delete('/:id/productos/:id_prod', deleteProductOfCartById);

module.exports = router;