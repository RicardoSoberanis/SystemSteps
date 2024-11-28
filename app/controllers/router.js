const express = require('express');
const path = require('path');
const userRouter = require('../routes/users');
const projectRouter = require('../routes/projects');
const newsRouter = require('../routes/news');
const connectToDatabase = require('../db/db');
const authRouter = require('../routes/auth');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

connectToDatabase();

// Middleware global
router.use(express.json());

// Rutas
router.use('/auth', authRouter);
router.use('/users', authenticateToken, userRouter);
router.use('/projectsHandler', authenticateToken, projectRouter);
router.use('/news', newsRouter);

// Rutas para vistas
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('/aboutus', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'aboutus.html'));
});
router.get('/notifications', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'notifications.html'));
});
router.get('/create-project', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'createProject.html'));
});
router.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'projects.html'));
});
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'profile.html'));
});

module.exports = router;