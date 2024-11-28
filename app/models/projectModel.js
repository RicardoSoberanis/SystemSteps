const mongoose = require('mongoose');

// Esquema de Proyectos
const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, // Contenido en formato Markdown
        required: true,
    },
    banner: {
        type: String, // URL o base64 de la imagen del banner
        required: false, // Opcional si no siempre es obligatorio
    },
    professor: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    lenguajes: {
        type: [String],
        required: true
    },
    category: {
        type: String, // Categoría del proyecto
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Fecha de creación
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Relación con un usuario
        ref: 'users', // Nombre de la colección de usuarios
        required: true,
    },
    likes:{
        type:Number,
        default: 0,
    },
    comments:{
        userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
        text: { type: String, required: false },
        likes: { type: Number, default: 0 },
        replies: [ 
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: false },
                text: { type: String, required: false },
                likes: { type: Number, default: 0 },
            },
        ],
    },
});

// Modelo de Proyectos
const Project = mongoose.model('projects', projectSchema);

module.exports = Project;

