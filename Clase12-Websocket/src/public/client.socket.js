const socket = io()
const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')

formMessage.addEventListener('submit', event => {
    event.preventDefault();

    const username = usernameInput.value;
    const message = messageInput.value;

    socket.emit('client:message', {username, message});
})

socket.on('server:message', messageArray => {
    messagePool.innerHTML = ""
    messageArray.forEach(messageInfo => {
        messagePool.innerHTML += `<li>${messageInfo.username}: ${messageInfo.message}</li>`

    })
})