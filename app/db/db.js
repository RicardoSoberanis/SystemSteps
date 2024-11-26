const mongoose = require('mongoose');

const mongoConnection = "mongodb+srv://Admin:KoKi190804@myapp.ong23.mongodb.net/MyAppDB";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoConnection);
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1); // Finaliza el proceso si hay un error de conexión
    }
};

module.exports = connectToDatabase;

