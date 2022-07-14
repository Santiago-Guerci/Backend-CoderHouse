class Mensajes {
    constructor(database, table) {
        this.database = database;
        this.table = table;
    }

    // async getData() {
        
    // }

    async save(msg) {
        try {
            await this.database(this.table).insert(msg);
            console.log(`Message saved`);
        } catch (err) {
           console.log(`Error saving message. Error: ${err}`);
           throw err; 
        }
    }

    async getAll() {
        try {
            let allMessages = await this.database.from(this.table).select('*');
            return allMessages;
        } catch (err) {
            if(err.errno === 1) {
                const createMsgTable = require('../db/messages/createMsgTable');
                await createMsgTable();
                console.log(`${this.table} table created`)
                return [];
            } else {
                console.log(`Error getting all messages. Error: ${err}`);
                throw err;
            }
        }
    }
}

module.exports = Mensajes;