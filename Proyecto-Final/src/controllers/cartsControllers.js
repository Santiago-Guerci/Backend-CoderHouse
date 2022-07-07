const Carrito = require('../cartContainer');
const carritos = new Carrito('./src/jsonFiles/carts.json');
const { productos } = require('../controllers/productsControllers');

const postCart = async (req, res) => {
    res.json(await carritos.createCart());
}

const deleteCartById = async (req, res) => {
    let id = parseInt(req.params.id);
    await carritos.emptyCart(id);
    res.json(await carritos.deleteCart(id));
}

const getProductsOnCartById = async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await carritos.getProductsById(id));
}

const postProductsOnCartById = async (req, res) => {
    let id = parseInt(req.params.id);
    let prodId = req.body.id;
    let myProd = await productos.getById(prodId);
    res.json(carritos.postProductOnCart(id, myProd));
}

const deleteProductOfCartById = (req, res) => {
    let id = parseInt(req.params.id);
    let prodId = parseInt(req.params.id_prod);
    res.json(carritos.deleteProductOfCart(id, prodId));
}

module.exports = { postCart, deleteCartById, getProductsOnCartById, postProductsOnCartById, deleteProductOfCartById };