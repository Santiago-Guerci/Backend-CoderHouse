const database = require('../database').mysqlConnection;

const createProdTable = async () => {
    try{
        await database.schema.dropTableIfExists('products')

        await database.schema.createTable('products', prodTable => {
            prodTable.increments('id').primary();
            prodTable.string('title', 50).notNullable();
            prodTable.integer('price').notNullable();
            prodTable.string('thumbnail', 150).notNullable();
        })
        console.log('Products table created succesfully!');
    } catch (err) {
        console.log(`Error creating products table. Code: ${err}`);
    }
}

module.exports = createProdTable;