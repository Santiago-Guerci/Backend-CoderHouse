const socket = io()

function renderProducts(productos) {
    fetch('/plantilla.hbs').then(response => {
        response.text().then((plantilla) => {
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