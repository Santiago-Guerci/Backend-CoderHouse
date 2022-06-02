const express = require('express');
const app = express();
const port = 8080;

//Middleware
app.use((req, res, next) => {
    visitas++;
    next();
})

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue">Bienvenidos a mi servidor express</h1>');
})

let visitas = 0;
app.get('/visitas', (req, res) => {
    res.send(`Cantidad de visitas: ${visitas}`);
})

app.get('/fyh', (req, res) => {
    let date = new Date().toLocaleString();
    res.send(`fyh: ${date}`);
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})