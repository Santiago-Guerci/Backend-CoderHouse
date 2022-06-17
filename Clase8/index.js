const express = require('express');
const app = express();
const productsRoutes = require('./routes/productos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', productsRoutes);
app.use('/', express.static('public'));

app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
})