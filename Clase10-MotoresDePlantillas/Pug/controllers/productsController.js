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

const getFormulario = (req, res) => {
    res.render('index.pug');
}

const getProductos = (req, res) => {
    res.render('productos.pug', {productos});
}

const addProducto = (req, res) => {
	let {title, price, thumbnail} = req.body;
    let newProduct = {
        title,
        price,
        thumbnail,
        id: productos.length + 1
    }
    productos.push(newProduct);
    res.redirect('/');
}

module.exports = { getFormulario, getProductos, addProducto }