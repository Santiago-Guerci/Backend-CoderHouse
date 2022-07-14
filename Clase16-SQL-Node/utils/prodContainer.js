class Contenedor {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    // async getData() {

    // }

    async save(object) {
        try {
            const id = await this.database(this.table).insert(object);
            object.id = id[0]
            return object.id;
        } catch (err) {
            console.log(`Error saving object on table ${this.table}. Error: ${err}`);
            throw err;
        }
    }

    async getById(id) {
        try {
            const product = await this.database.from(this.table).select('id').where('id', '=', id);
            console.log(product);
            return product;
        } catch (err) {
            console.log(`Error obtaining product by id. Error: ${err}`)
            throw err;
        }
    }

    async getAll() {
        try {
            const allProducts = await this.database.from(this.table).select('*');
            return allProducts;
        } catch (err) {
            if(err.code === 'ER_NO_SUCH_TABLE') {
                const createProdTable = require('../db/products/createProdTable');
                await createProdTable();
                return [];
            } else {
                console.log(`Error obtaining all products. Error: ${err}`)
                throw err;
            }
        }
    }

    async updateProduct(id, newobj) {
        try {
            await this.database.from(this.table).where('id', '=', id).update(newobj)
            console.log(`Product with id ${id} updated.`)    
        } catch (err) {
            console.log(`Error updating product ${id}. Error: ${err}`);
            throw err;
        }
    }

    async deleteById(id) {
        try {
            await this.database.from(this.table).where({id}).del();
            console.log(`Product ${id} deleted`);
        } catch (err) {
            console.log(`Error deleting product ${id}. Error: ${err}`);
            throw err;
        }
    }

    async deleteAll() {
        try {
            await this.database.from(this.table).del();
            console.log(`All products in table '${this.table}' were deleted`);
        } catch (err) {
            console.log(`Error deleting all products from table '${this.table}'. Error: ${err}`);
            throw err;
        }
    }
}

module.exports = Contenedor;