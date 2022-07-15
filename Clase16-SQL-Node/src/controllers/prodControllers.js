const Contenedor = require('../../utils/prodContainer');
const prodDB = require('../../db/database').mysqlConnection;
const products = new Contenedor(prodDB, 'products');

const getProducts = async (req, res) => {
    res.json(await products.getAll());
}

const getProdById = async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await products.getById(id))
}

const postProducts = async (req, res) => {
    let myProd = req.body;
    res.json(await products.save(myProd));
}

const putProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    let newProps = req.body;
    res.json(await products.updateProduct(id, newProps));
}

const deleteProduct = async (req, res) => {
    let id = parseInt(req.params.id);
    res.json(await products.deleteById(id));
}

const deleteAllProducts = async (req, res) => {
    res.json(await products.deleteAll())
}

module.exports = {getProducts, getProdById, postProducts, putProduct, deleteProduct, deleteAllProducts}