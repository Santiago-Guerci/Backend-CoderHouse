const express = require('express');
const { Router } = express;
let router = new Router();
const { getProductOrAll, postProduct, putProduct, deleteProduct } = require('../controllers/productsControllers');
const admin = false;

const verifyLogin = (admin) => {
    return((req, res, next) => {
        if(admin === true) {
            next;
        } else {
            res.json({Error: -1, descripcion: `Ruta ${req.route.path}, Metodo ${req.route.stack[0].method} - No autorizada}`})
        }
    })
}

// Rutas
router.get('/:id?', getProductOrAll);
router.post('/', verifyLogin(admin), postProduct);
router.put('/:id', verifyLogin(admin), putProduct);
router.delete('/:id', verifyLogin(admin), deleteProduct);

module.exports = router;