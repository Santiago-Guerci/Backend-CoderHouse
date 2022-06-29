const socket = io()
const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')

formMessage.addEventListener('submit', event => {
    event.preventDefault();
})