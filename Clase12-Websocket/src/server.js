const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const { Server: IOServer } = require('socket.io');
const expressServer = app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})
const messageArray = [];

app.use(express.static(path.join(__dirname, './public')));

const io = new IOServer(expressServer);

io.on('connection', socket => {
    console.log(`Se conectó el id ${socket.id}`)

    socket.emit('server:message', messageArray);

    socket.on('client:message', messageInfo => {
        messageArray.push(messageInfo)

        io.emit('server:message', messageArray);
    })
})