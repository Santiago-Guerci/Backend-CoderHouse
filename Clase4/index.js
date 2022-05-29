const fs = require('fs');
const { stringify } = require('querystring');

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
                }
            }
        });
    }

    async getAll() {
        let jsonInfo = await this.getData();
        console.log(jsonInfo);
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

let contenedor = new Contenedor('products.json');
contenedor.save({name: 'Captain America: Civil War', price: 200, thumbnail: 'https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg'});
contenedor.getById(1);
contenedor.getAll();
contenedor.deleteById(2);
contenedor.deleteAll();