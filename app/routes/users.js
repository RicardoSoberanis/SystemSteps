const express = require('express');
const router = express.Router();
const {
    addUser,
    getUser,
    updateUser,
    deleteUser,
    checkUserExists,
    updateUserProgress,
} = require('../controllers/users');
const authenticateToken = require('../middlewares/authMiddleware');

// Crear un usuario
router.post('/', async (req, res) => {
    try {
        const user = await addUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
});

// Obtener un usuario por ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await getUser({ _id: req.params.userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: 'Usuario no encontrado', error: error.message });
    }
});

// Actualizar un usuario
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await updateUser(req.params.userId, req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});

// Eliminar un usuario
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await deleteUser(req.params.userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
});

// Verificar si un email ya existe
router.post('/check-email', async (req, res) => {
    try {
        const emailExists = await checkUserExists({ email: req.body.email });
        res.status(200).json({ exists: emailExists });
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar email', error: error.message });
    }
});

// Actualizar progreso del usuario
router.put('/progress/:userId', authenticateToken, async (req, res) => {
    try {
        const updatedUser = await updateUserProgress(req.params.userId, req.body.points);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar progreso', error: error.message });
    }
});

module.exports = router;
