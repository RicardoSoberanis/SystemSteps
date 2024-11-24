const mongoose = require('mongoose');
let mongoConnection = "mongodb+srv://Admin:KoKi190804@myapp.ong23.mongodb.net/MyAppDB";

mongoose.connect(mongoConnection);

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        min: 18,
        max: 80,
        required: true
    },
    carrera: {
        type: String,
        enum: ['IE', 'ISC', 'IES', 'ISI'],
        required: true
    }
});

//Creamos el modelo (nombre, esquema)
let User = mongoose.model('users', userSchema);

//informacion que va tener nuestro nuevo registro
let newUser = {name: "Gualo Kevin Villanoreal", edad: 34, carrera: "ISC"};

//A partir de la informacion y el modelo, hacemos un usuario.
let user = User(newUser);

//guardar
user.save().then((doc) => console.log("Usuario creado: " + doc));

