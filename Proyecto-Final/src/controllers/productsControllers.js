const Contenedor = require('./container');
const productos = new Contenedor('./routes/products.json');

const getProductOrAll = async (req, res) => {
    let id = req.params.id;
    if(id) {
        try {
            res.send(productos.getById(id));
        } catch {
            res.send({error: 'Producto no encontrado'})
        }
    } else {
        try {
            res.send(await productos.getAll());
        } catch {
            res.send({error: 'Id no encontrado'})
        }
    }
}

const postProduct = (req, res) => {
    try {
        let {title, price, thumbnail} = req.body;
        let newProduct = {title, price, thumbnail};
        productos.save(newProduct);
        res.redirect('/');
    } catch {
        res.send({error: 'Error en petición POST'})
    }
}

const putProduct = (req, res) => {
    let id = req.params.id;
    try {
        let {title, price, thumbnail} = req.body;
        productos[id-1].title = title;
        productos[id-1].price = price;
        productos[id-1].thumbnail = thumbnail;
        console.log('Producto actualizado');
        res.send(productos);
    } catch {
        res.send({error: 'Producto no encontrado'});
    }
}

const deleteProduct = (req, res) => {
    let id = req.params.id;
    try {
        let index = id - 1;
        if(index > -1) {
            productos.splice(index, 1);
            res.send('Se ha eliminado el producto con índice ' + id);
        }
    } catch {
        res.send({error: 'Producto no encontrado'});
    }
}

module.exports = { getProductOrAll, postProduct, putProduct, deleteProduct }