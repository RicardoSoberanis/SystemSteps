const mongoose = require('mongoose');
let mongoConnection = "mongodb+srv://Admin:KoKi190804@myapp.ong23.mongodb.net/MyAppDB";

mongoose.connect(mongoConnection);

let newSchema = mongoose.Schema({

});

//Creamos el modelo (nombre, esquema)
let New = mongoose.model('news', userSchema);

//informacion que va tener nuestro nuevo registro
let newNew = {};

//A partir de la informacion y el modelo, hacemos un usuario.
let neW = New(newNew);

//guardar
neW.save().then((doc) => console.log("Noticia creado: " + doc));
