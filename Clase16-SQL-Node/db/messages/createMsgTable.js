const database = require('../database').sqliteConnection;

const createMsgTable = async () => {
    try{
        await database.schema.dropTableIfExists('messages')

        await database.schema.createTable('messages', msgTable => {
            msgTable.increment('id').primary();
            msgTable.string('username', 50).notNullable();
            msgTable.string('timestamp', 30).notNullable();
            msgTable.string('message', 500);
        })
        console.log('Messages table created succesfully!');
        database.destroy();
    } catch (err) {
        console.log(`Error creating messages table. Code: ${err}`);
        database.destroy();
    }
}

module.exports = createMsgTable;