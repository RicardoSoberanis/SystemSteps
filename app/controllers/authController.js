const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const SECRET_KEY = 'tu_clave_secreta_super_segura'; // Cambiar por una clave segura y almacenar en variables de entorno

// Login de usuario
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    return { token, user };
};

// Verificar token
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = { loginUser, verifyToken };
