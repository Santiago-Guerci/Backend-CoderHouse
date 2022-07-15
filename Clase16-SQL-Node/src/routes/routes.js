const {Router} = require('express');
const router = Router();
const {getProducts, getProdById, postProducts, putProduct, deleteProduct, deleteAllProducts} = require('../controllers/prodControllers');

router.get('/', getProducts);
router.get('/:id', getProdById);
router.post('/', postProducts);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);
router.delete('/', deleteAllProducts);

module.exports = router;