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
const Mensajes = require('../utils/msgContainer')

//Me traigo las bases de datos y los datos en ellas.
const productsDB = require('../db/database').mysqlConnection;
const products = new Contenedor(productsDB, 'products');
const messagesDB = require('../db/database').sqliteConnection;
const messagesPool = new Mensajes(messagesDB, 'messages');

io.on('connection', async socket => {
    console.log(`Se conectó el id ${socket.id}`)

	const mensajes = await messagesPool.getAll();
	const productos = await products.getAll();

    socket.emit('server:products', productos);
	socket.emit('server:message', mensajes);

	socket.on('client:formProduct', async productInfo => {
		products.save(productInfo);

		io.emit('server:products', productos);
	})

	socket.on('client:message', async messageInfo => {
        messagesPool.save(messageInfo)

        io.emit('server:message', mensajes);
    })
})