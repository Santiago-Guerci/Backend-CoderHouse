//Todo lo necesario para levantar el server
const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => { console.log('Server running on port') })
const io = new IOServer(expressServer)

//Levanta el html de public.
app.use(express.static(path.join(__dirname, '../public')))

//Traigo las clases de producto y mensajes.
const Contenedor = require('../utils/prodContainer')
const Mensajes = require('../utils/messContainer')

//Me traigo las bases de datos y los datos en ellas.
const productsDB = require('./db/database').mysqlConnection;
const products = new Contenedor(productsDB, 'products');
const messagesDB = require('./db/database').sqliteConnection;
const messagesPool = new Mensajes(messagesDB, 'messages');

io.on('connection', socket => {
    console.log(`Se conectó el id ${socket.id}`)
    socket.emit('server:products', productos);
	socket.emit('server:message', messageArray);

	socket.on('client:formProduct', productInfo => {
		productos.push(productInfo);

		io.emit('server:products', productos);
	})

	socket.on('client:message', messageInfo => {
        messageArray.push(messageInfo)

        io.emit('server:message', messageArray);
    })
})