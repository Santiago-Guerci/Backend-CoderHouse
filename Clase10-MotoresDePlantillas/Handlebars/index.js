const express = require('express');
const {engine} = require('express-handlebars');
const app = express();
const path = require('path');
const rutas = require('./routes/index');

app.use(express.json())
app.use(express.urlencoded({ extended:true }));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

app.engine("hbs", engine({
   extname:".hbs",
   defaultLayout:"main.hbs",
   partialsDir: __dirname + "/views/partials" 
}));

app.use('/', rutas);

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});