const fs = require('fs');

class Contenedor {
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
        let timestamp = Date.now();
        let newObj = {id, timestamp, ...object};
        jsonInfo.push(newObj);
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8');
            console.log(`The element number ${id} has been saved`);
        } catch (err) {
            console.log('There has been an error saving the file');
            throw err;
        }
    }

    async getById(id) {
        try {
            let jsonInfo = await this.getData()
            let result = jsonInfo.find(item => item.id === id)

            if(typeof result === 'undefined') {
                console.log('The element does not exist');
            } else {
                return result;
            }

        } catch {
            console.log('Error reading the file');
        }
    }

    async getAll() {
        let jsonInfo = await this.getData();
        return jsonInfo;
    }

    async updateProduct(id, props) {
        let jsonInfo = await this.getData();
        let newProps = props;
        jsonInfo[id-1].name = newProps.name
        jsonInfo[id-1].description = newProps.description
        jsonInfo[id-1].code = newProps.code
        jsonInfo[id-1].thumbnail = newProps.thumbnail
        jsonInfo[id-1].price = newProps.price
        jsonInfo[id-1].stock = newProps.stock
        try {
            fs.promises.writeFile(this.url, JSON.stringify(jsonInfo, null, '\t'), 'utf-8');
            console.log(`The product ${id} has been updated`)
        } catch (err) {
            console.log(`Error updating product ${id}`);
        }
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