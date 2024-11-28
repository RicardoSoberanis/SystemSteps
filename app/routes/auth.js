const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../controllers/users');

const SECRET_KEY = process.env.SECRET_KEY;

router.post('/check-email', async (req, res) => {
    try {
        const emailExists = await userController.checkUserExists({ email: req.body.email });
        if (emailExists) {
            return res.status(400).json({ success: false, message: 'El email ya está registrado' });
        }
        res.status(200).json({ success: true, message: 'El email está disponible' });
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar email', error: error.message });
    }
});

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password, carrera, edad, usuario, gitHubUser, linkedInUser} = req.body;
    try {
        const hashedPassword = password;

        const newUser = new User({ name, email, password: hashedPassword, carrera, edad, usuario, gitHubUser, linkedInUser});
        const savedUser = await newUser.save();

        // Generar un token JWT para el usuario registrado
        const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, SECRET_KEY, { expiresIn: '3h' });

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
