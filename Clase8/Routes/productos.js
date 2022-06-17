const Contenedor = require('./container');
const express = require('express');
const { Router } = express;
let router = new Router();

const productos = new Contenedor('./Routes/products.json');

router.get('/', async (req, res) => {
    res.send(await productos.getAll());
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    try {
        res.send(productos.getById(id));
    } catch {
        res.status(404).send({error: 'Producto no encontrado'});
    }
});

router.post('/', (req, res) => {
    let {title, price, thumbnail} = req.body;
    let newProduct = {
        title,
        price,
        thumbnail
    }
    productos.save(newProduct);
    res.redirect('/');
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
        res.status(404).send({error: 'Producto no encontrado'});
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
        res.status(404).send({error: 'Producto no encontrado'});
    }
});

module.exports = router;