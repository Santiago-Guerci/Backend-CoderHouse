const express = require('express');
const app = express();
const productsRoutes = require('./Routes/productos');
const cartsRoutes = require('./Routes/carritos');
const puerto = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', productsRoutes);
app.use('/api/carrito', cartsRoutes);
app.use('/', express.static('public'));

app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})