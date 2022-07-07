const fs = require('fs');

class Carrito {
    constructor(fileName) {
        this.url = fileName;
    }

    async getData() {
        try {
            const data = await fs.promises.readFile(this.url, 'utf-8');
            const json = JSON.parse(data)
            return json;
        } catch (err) {
            throw err;
        }
    }
    
    async createCart() {
        let jsonInfo = await this.getData();
        let id = jsonInfo.length + 1;
        let timestamp = Date.now();
        let products = [];
        let newCart = {id, timestamp, products}
        jsonInfo.push(newCart)
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8');
            console.log(`Cart id: ${id} has been created`);
            return id;
        } catch (err) {
            console.log('There has been an error creating the cart');
        }
    }

    async emptyCart(id) {
        let jsonInfo = await this.getData();
        let thisCart = jsonInfo.find(item => item.id === id);
        thisCart.products = []
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8');
            console.log(`The cart ${id} has been emptied`);
        } catch (err) {
            console.log(`Error emtpying cart ${id}. Error: ${err}`);
            throw err;
        }
    }

    async deleteCart(id) {
        let jsonInfo = await this.getData();
        let restOfCarts = jsonInfo.filter(item => item.id !== id);
        try {
            fs.promises.writeFile(this.url, JSON.stringify(restOfCarts, null, '\t'), 'utf-8');
            console.log(`The cart ${id} has been deleted`);
        } catch (err) {
            console.log(`Error deleting cart ${id}. Error: ${err}`);
            throw err;
        }
    }

    async getProductsById(id) {
        let jsonInfo = await this.getData()
        let thisCart = jsonInfo.find(item => item.id === id)
        return thisCart.products;
    }

    //De los productos que ya tengo, cada prod tiene un id. Lo agarro, y lo meto en el cart solicitado (lo agarro por req.body)
    async postProductOnCart(id, myProd) {
        console.log(myProd);
        let jsonInfo = await this.getData();
        let thisCart = jsonInfo.find(item => item.id === id)
        thisCart.products.push(myProd);
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8');
            console.log(`The product ${myProd.id} has been added to cart ${id}`);
        } catch (err) {
            console.log(`Error pushing product in cart`);
        }
    }

    async deleteProductOfCart(id, prodId) {
        let jsonInfo = await this.getData()
        let cartProds = await this.getProductsById(id);
        let index = cartProds.indexOf(prodId)
        jsonInfo[id-1].products.splice(index, 1)
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8')
            console.log(`The product ${prodId} has been deleted from cart ${id}`);
        } catch (err) {
            console.log(`Error deleting product from cart`);
        }
    }

}

module.exports = Carrito;