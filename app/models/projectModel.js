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
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fbanner-background&psig=AOvVaw0gutqZieTJi8jpJVQ4bDJn&ust=1732857143420000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCIsYmi_okDFQAAAAAdAAAAABAw',
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

