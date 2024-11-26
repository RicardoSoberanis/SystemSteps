const User = require('../models/userModel');

// Crear un usuario
const addUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Obtener un usuario por ID o email
const getUser = async (query) => {
    return await User.findOne(query);
};

// Actualizar un usuario
const updateUser = async (userId, updates) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        return updatedUser;
    } catch (error) {
        throw new Error('Error al actualizar el usuario');
    }
};

// Eliminar un usuario
const deleteUser = async (userId) => {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        return deletedUser;
    } catch (error) {
        throw new Error('Error al eliminar el usuario');
    }
};

// Verificar si un email o usuario ya existe
const checkUserExists = async (query) => {
    console.log('si entro al chech')
    try {
        console.log('lo intenta')
        const user = await User.findOne(query);
        console.log('pudo encontrarlo')
        return !!user;
    } catch (error) {
        throw new Error('Error al verificar el usuario');
    }
};

// Actualizar progreso del usuario
const updateUserProgress = async (userId, points) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('Usuario no encontrado');

        user.puntos += points;

        // Actualizar rango
        if (user.puntos >= 1000) user.rango = 'Experto';
        else if (user.puntos >= 500) user.rango = 'Avanzado';
        else if (user.puntos >= 100) user.rango = 'Intermedio';
        else user.rango = 'Principiante';

        return await user.save();
    } catch (error) {
        throw new Error('Error al actualizar el progreso del usuario');
    }
};

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser,
    checkUserExists,
    updateUserProgress,
};
