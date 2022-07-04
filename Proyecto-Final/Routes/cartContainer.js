const fs = require('fs');

class Carrito {
    constructor(fileName) {
        this.url = fileName;
    }

    async getData() {
        try {
            const data = await fs.promises.readFile(this.url, 'utf8');
            const json = JSON.parse(data)
            return json;
        } 
        catch (err) {
            throw err;
        }
    }

    async save(object) {
        let jsonInfo = await this.getData();
        let id = jsonInfo.length + 1;
        let newObj = {...object, id};
        jsonInfo.push(newObj);
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8');
            console.log(`The element number ${id} has been saved`);
        } catch (err) {
            console.log('There has been an error saving the file');
            throw err;
        }
    }

    getById(id) {
        fs.readFile(this.url, 'utf-8', (err, data) => {
            if (err) {
                console.log('There has been an error reading the file');
                throw err;
            } else {
                let array = JSON.parse(data);
                let result = array.find(item => item.id === id);

                if (typeof result === 'undefined') {
                    console.log('The element does not exist');
                } else {
                    console.log(result);
                    return result;
                }
            }
        });
    }

    async getAll() {
        let jsonInfo = await this.getData();
        return jsonInfo;
    }

    async deleteById(id) {
        let jsonInfo = await this.getData();
        let result = jsonInfo.filter(item => item.id !== id);
        fs.writeFile(this.url, JSON.stringify(result, null, '\t'), 'utf-8', (err) => {
            if (err) throw err;
            console.log(`The element number ${id} has been deleted`);
        });
    }

    deleteAll() {
        fs.writeFile(this.url, '', 'utf-8', (err) => {
            if (err) throw err;
            console.log('All elements have been deleted');
        });
    }
}

module.exports = Contenedor;