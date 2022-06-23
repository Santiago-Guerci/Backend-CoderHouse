const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

let productos = [{
    title: "Titulo1",
    price: 40,
    description: "descripcion1",
    id: 1
}, 
{
    title: "Titulo2",
    price: 50,
    description: "descripcion2",
    id: 2
}];

app.get("/", (req, res) => {
    res.render("index", {data: productos});
});

app.get("/productos", (req, res) => {
    res.render("productos", {data: productos});
})

app.post("/productos", (req, res) => {
    let {title, price, description} = req.body;
    let newProduct = {
        title,
        price,
        description,
        id: productos.length + 1
    }
    productos.push(newProduct);
    res.render("/index", {data: productos});
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});