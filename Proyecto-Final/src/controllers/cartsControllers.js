const Carrito = require('../cartContainer');
const carritos = new Carrito('../jsonFiles/carts.json');

const postCart = async (req, res) => {
    res.json(await carritos.createCart());
}

const deleteCartById = async (req, res) => {
    let id = req.params.id;
    await carritos.emptyCart(id);
    res.json(await carritos.deleteCart(id));
}

const getProductsOnCartById = async (req, res) => {
    let id = req.params.id;
    res.json(await carritos.getProductsById(id));
}

const postProductsOnCartById = (req, res) => {
    
}

const deleteProductOfCartById = (req, res) => {
    
}

module.exports = { postCart, deleteCartById, getProductsOnCartById, postProductsOnCartById, deleteProductOfCartById };