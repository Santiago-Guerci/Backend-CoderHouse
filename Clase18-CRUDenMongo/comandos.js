mongo
show databases
use ecommerce
db.createCollection('productos')
db.createCollection('mensajes')

db.productos.insertMany([
    {
        title: "Capitan América: Civil War",
        price: 100,
        thumbnail: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/bf/Captain_America_Civil_War_-_Poster_definitivo.png/revision/latest?cb=20191029195149&path-prefix=es"
    },
    {
        title: "Spiderman: Homecoming",
        price: 1510,
        thumbnail: "https://pics.filmaffinity.com/Spider_Man_Homecoming-336093112-large.jpg"
    },
    {
        title: "Spiderman: Far From Home",
        price: 2133,
        thumbnail: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/f/fc/Spider_Man_Far_From_Home_-_P%C3%B3ster_EEUU.png/revision/latest?cb=20190522204227&path-prefix=es"
    },
    {
        title: "Spiderman: No Way Home",
        price: 3200,
        thumbnail: "https://pics.filmaffinity.com/Spider_Man_No_Way_Home-642739124-large.jpg"
    },
    {
        title: "Avengers: Infinity War",
        price: 5000,
        thumbnail: "https://static.wikia.nocookie.net/disney/images/e/e3/Infinity_War_Poster.jpg/revision/latest?cb=20180317002413&path-prefix=es"
    },
    {
        title: "Avengers: Endgame",
        price: 4870,
        thumbnail: "https://play-lh.googleusercontent.com/XDg-bt655am_Q-7X-I0s64Kq8SJKfb7BBTHkUVbFR6-zDNv9J7rW61xZn0BB3SVCJ6gz=w240-h480-rw"
    },
    {
        title: "Avengers: Age Of Ultron",
        price: 500,
        thumbnail: "https://pics.filmaffinity.com/Vengadores_La_era_de_Ultr_n-401801933-large.jpg"
    },
    {
        title: "Black Panther",
        price: 3100,
        thumbnail: "https://pics.filmaffinity.com/Black_Panther-992613805-large.jpg"
    },
    {
        title: "Doctor Strange In The Multiverse Of Madness",
        price: 810,
        thumbnail: "https://pics.filmaffinity.com/Doctor_Strange_en_el_multiverso_de_la_locura-812289638-large.jpg"
    },
    {
        title: "Doctor Strange",
        price: 2786,
        thumbnail: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/64/Doctor_Strange_-_Poster_2.png/revision/latest?cb=20191029195245&path-prefix=es"
    }
])

db.mensajes.insertMany([
    {
        username: "santi@gmail.com",
        timestamp: "10/12/2022",
        message: "Hola como estas?"
    },
    {
        username: "pedro@gmail.com",
        timestamp: "10/12/2022",
        message: "Muy bien y vos?"
    },
    {
        username: "juana@gmail.com",
        timestamp: "08/08/2022",
        message: "Hay alguien aca?"
    },
    {
        username: "roberto@gmail.com",
        timestamp: "10/10/2010",
        message: "Este mensaje es de prueba"
    },
    {
        username: "julian@gmail.com",
        timestamp: "11/11/2011",
        message: "Lorem Ipsum"
    },
    {
        username: "joaquin@gmail.com",
        timestamp: "19/09/2019",
        message: "This is a test message"
    },
    {
        username: "nuevo@gmail.com",
        timestamp: "10/12/2022",
        message: "Nuevo está saludando"
    },
    {
        username: "otro@gmail.com",
        timestamp: "03/03/2022",
        message: "Otro está saludando"
    },
    {
        username: "test@gmail.com",
        timestamp: "05/05/2022",
        message: "Testeando el array de mensajes"
    },
    {
        username: "database@gmail.com",
        timestamp: "06/06/2022",
        message: "Array de mensajes en database"
    }
])

db.productos.find()
db.mensajes.find()
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()

db.productos.insertOne({
    title: "Captain Marvel",
    price: 4600,
    thumbnail: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/6/66/Captain_Marvel_-_P%C3%B3ster_Diciembre_2018.png/revision/latest/scale-to-width-down/1200?cb=20191029195629&path-prefix=es"
})

db.productos.find({"price": {$lt: 1000}})
db.productos.find({$and: [{"price": {$lt: 3000}}, {"price": {$gt: 1000}}]})
db.productos.find({"price": {$gt: 3000}})
db.productos.find({}, {"title": 1, "_id": 0})
db.productos.find({}, {"title": 1, "_id": 0}).sort({"price": 1}).skip(2).limit(1)

db.productos.updateMany({}, {$set: {"stock": 100}})
db.productos.updateMany({"price": {$gt: 4000}}, {$set: {"stock": 0}})

db.productos.deleteMany({"price": {$lt: 1000}})

use admin
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db: "ecommerce"}]})

mongo -u pepe -p asd456
use ecommerce
db.productos.insertOne({"title": "Prueba 5"})