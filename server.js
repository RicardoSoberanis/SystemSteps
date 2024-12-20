require('dotenv').config();
const express = require('express');
const router = require('./app/controllers/router');
const path = require('path');

const app = express();
const port = 3000;

// Middleware global
app.use(express.static(__dirname + '/app/views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos desde la carpeta uploads
app.use(express.json());

app.use('/', router);

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});