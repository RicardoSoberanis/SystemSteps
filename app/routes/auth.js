const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userController = require('../controllers/users');

const SECRET_KEY = 'tu_clave_secreta';

router.post('/check-email', async (req, res) => {
    console.log('entro a la ruta')
    try {
        console.log('Antes de checar')
        console.log(req.body)
        const emailExists = await userController.checkUserExists({ email: req.body.email });
        if (emailExists) {
            console.log('si lo encontro')
            return res.status(400).json({ success: false, message: 'El email ya está registrado' });
        }
        console.log('si se puede usar')
        res.status(200).json({ success: true, message: 'El email está disponible' });
        console.log('si envia trueeeee')
    } catch (error) {
        console.log('no se pudo verificar ese fue el pedo')
        res.status(500).json({ message: 'Error al verificar email', error: error.message });
    }
});

// Registro de usuario
router.post('/register', async (req, res) => {
    const { name, email, password, carrera, edad, usuario } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, carrera, edad, usuario });
        const savedUser = await newUser.save();

        // Generar un token JWT para el usuario registrado
        const token = jwt.sign({ id: savedUser._id, email: savedUser.email }, SECRET_KEY, { expiresIn: '1h' });

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
