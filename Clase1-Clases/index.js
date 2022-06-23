class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`);
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        console.log( this.mascotas.length );
    }

    addBook(bookName, author) {
        this.libros.push(
            {nombre: bookName, autor: author}
        )
    }

    getBookNames() {
        console.log( this.libros.map(book => book.nombre) );
    }
}

const usuario = new Usuario('Santiago', 'Güerci');

usuario.getFullName();
usuario.addMascota('Gato');
usuario.addMascota('Nutria');
usuario.countMascotas();
usuario.addBook('El señor de los anillos', 'J.R.R. Tolkien');
usuario.addBook('El señor de las moscas', 'George Orwell');
usuario.getBookNames();