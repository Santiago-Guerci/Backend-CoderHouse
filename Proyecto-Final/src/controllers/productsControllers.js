const Contenedor = require('../prodContainer');
const productos = new Contenedor('../jsonFiles/products.json');

const getProductOrAll = async (req, res) => {
    let id = req.params.id;
    if(id) {
        try {
            res.json(productos.getById(id));
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

const putProduct = (req, res) => {
    let id = req.params.id;
    try {
        let {name, description, code, thumbnail, price, stock} = req.body;
        productos[id-1].name = name;
        productos[id-1].description = description;
        productos[id-1].code = code;
        productos[id-1].thumbnail = thumbnail;
        productos[id-1].price = price;
        productos[id-1].stock = stock;
        console.log('Producto actualizado');
        res.json(productos);
    } catch {
        res.json({error: 'Producto no encontrado'});
    }
}

const deleteProduct = (req, res) => {
    let id = req.params.id;
    try {
        let index = id - 1;
        if(index > -1) {
            productos.splice(index, 1);
            res.json('Se ha eliminado el producto con índice ' + id);
        }
    } catch {
        res.json({error: 'Producto no encontrado'});
    }
}

module.exports = { getProductOrAll, postProduct, putProduct, deleteProduct }