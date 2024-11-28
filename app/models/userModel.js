const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Esquema de Usuario
const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true },
    password: { 
        type: String, 
        required: true },
    carrera: { 
        type: String, 
        required: true },
    edad: { 
        type: Number, 
        required: true },
    usuario: { 
        type: String, 
        required: true, 
        unique: true },
    puntos: { 
        type: Number, 
        default: 0 },
    rango: { 
        type: String, 
        default: 'Principiante' },
    insignias: { 
        type: [String], 
        default: [] },
    imageProfile: {
        type: String,
        default: 'https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg',
        require: false
    },
    gitHubUser: {
        type: String,
        default: 'Agregar',
        require: false
    },
    linkedInUser: {
        type: String,
        default: 'Agregar',
        require: false
    }
});

// Middleware para hashear contraseñas
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
