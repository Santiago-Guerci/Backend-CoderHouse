const Contenedor = require('../prodContainer');
const productos = new Contenedor('./src/jsonFiles/products.json');

const getProductOrAll = async (req, res) => {
    let id = parseInt(req.params.id);
    if(id) {
        try {
            res.json(await productos.getById(id));
        } catch {
            res.json({error: 'Producto no encontrado'})
        }
    } else {
        try {
            res.json(await productos.getAll());
        } catch {
            res.json({error: 'Id no encontrado'})
        }
    }
}

const postProduct = (req, res) => {
    try {
        let {name, description, code, thumbnail, price, stock} = req.body;
        let newProduct = {name, description, code, thumbnail, price, stock};
        productos.save(newProduct);
        res.redirect('/');
    } catch {
        res.json({error: 'Error en petición POST'})
    }
}

const putProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        let {name, description, code, thumbnail, price, stock} = req.body;
        let newProd = {name, description, code, thumbnail, price, stock};
        res.json(await productos.updateProduct(id, newProd));
    } catch (err){
        res.json({error: 'Producto no encontrado. Codigo ' + err });
    }
}

const deleteProduct = (req, res) => {
    let id = parseInt(req.params.id);
    try {
        res.json(productos.deleteById(id));
    } catch {
        res.json({error: 'Producto no encontrado'});
    }
}

module.exports = { productos, getProductOrAll, postProduct, putProduct, deleteProduct }