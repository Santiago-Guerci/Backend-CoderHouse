const Contenedor = require('./container');
const express = require('express');
const { Router } = express;
let router = new Router();

const productos = new Contenedor('./Routes/products.json');

router.get('/', async (req, res) => {
    try {
        res.send(await productos.getAll());
    } catch {
        res.send({error: 'Error al mostrar todos los productos'});
    }
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    try {
        res.send(productos.getById(id));
    } catch {
        res.send({error: 'Producto no encontrado'});
    }
});

router.post('/', (req, res) => {
    try {
        let {title, price, thumbnail} = req.body;
        let newProduct = {
            title,
            price,
            thumbnail
        }
        productos.save(newProduct);
        res.redirect('/');
    } catch {
        res.send({error: 'Error en petición POST'});
    }
});

router.put('/:id', (req, res) => {
    try {
        let id = req.params.id;
        let {title, price, thumbnail} = req.body;
        productos[id-1].title = title;
        productos[id-1].price = price;
        productos[id-1].thumbnail = thumbnail;
        console.log('Producto actualizado');
        res.send(productos);
    } catch {
        res.send({error: 'Producto no encontrado'});
    }
});

router.delete('/:id', (req, res) => {
    try {
        let id = req.params.id;
        let index = id - 1;
        if(index > -1) {
            productos.splice(index, 1);
            res.send('Se ha eliminado el producto con índice ' + id);
        }
    } catch {
        res.send({error: 'Producto no encontrado'});
    }
});

module.exports = router;