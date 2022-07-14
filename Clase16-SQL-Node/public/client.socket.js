const socket = io()
const formProducts = document.querySelector('#formProducts');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const thumbnailInput = document.querySelector('#thumbnail');

const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const messagePool = document.querySelector('#messagePool')

formProducts.addEventListener('submit', e => {
    e.preventDefault();

    const title = titleInput.value;
    const price = parseInt(priceInput.value);
    const thumbnail = thumbnailInput.value;

    socket.emit('client:formProduct', {title, price, thumbnail});
})

formMessage.addEventListener('submit', event => {
    event.preventDefault();

    const username = usernameInput.value;
    const message = messageInput.value;

    socket.emit('client:message', {username, message});
})

function renderProducts(productos) {
    fetch('/plantilla.hbs').then(response => {
        response.text().then((plantilla) => {
            document.querySelector('#productos').innerHTML = "";
            productos.forEach(producto => {
                const template = Handlebars.compile(plantilla);
                const html = template(producto)
                document.querySelector('#productos').innerHTML += html;
            })
        })
    })
}

socket.on('server:products', productos => {
    renderProducts(productos)
})

socket.on('server:message', messageArray => {
    const date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let fecha = day + '/' + month + '/' + year;

    messagePool.innerHTML = ""
    messageArray.forEach(messageInfo => {
        messagePool.innerHTML += `<li style="color: brown;"> <b style="color: blue">${messageInfo.username}</b> [${fecha}]: <i style="color: green;">${messageInfo.message}</i> </li>`

    })
})