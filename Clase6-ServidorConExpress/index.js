const Contenedor = require('./container');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const productos = new Contenedor('./products.json');

app.get('/', (req, res) => {
    res.send('<h1>Bienvenido a mi servidor con express</h1>');
})

app.get('/productos', async (req,res) => {
    res.send(await productos.getAll());
})

app.get('/productoRandom', async (req,res) => {
    let json = await productos.getData();
    let random = Math.floor(Math.random() * json.length);
    res.send(json[random]);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})