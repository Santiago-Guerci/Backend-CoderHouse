const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => { console.log('Server running on port') })
const io = new IOServer(expressServer)
const messageArray = [];

const productos = [
	{
		title: "Avengers: Endgame",
		price: 50,
		thumbnail: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
		id: 1
	},
	{
		title: "Spiderman: No Way Home",
		price: 30,
		thumbnail: "https://images-na.ssl-images-amazon.com/images/I/91PKNbBAufL._RI_.jpg",
		id: 2
	},
	{
		title: "Captain America: Civil War",
		price: 200,
		thumbnail: "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
		id: 3
	}
]

app.use(express.static(path.join(__dirname, '../public')))

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