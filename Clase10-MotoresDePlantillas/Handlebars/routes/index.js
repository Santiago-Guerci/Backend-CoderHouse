const {Router} = require('express');
const router = Router();
const { getFormulario, getProductos, addProducto } = require('../controllers/productsControllers');

router.get("/", getFormulario);
router.get("/productos", getProductos);
router.post("/productos", addProducto);

module.exports = router;