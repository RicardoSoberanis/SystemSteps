const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authMiddleware'); // Middleware para verificar el token
const {
    addProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
} = require('../controllers/projects');

// Crear un proyecto
router.post('/', authenticateToken, async (req, res) => {
    try {
        const projectData = req.body;
        projectData.userId = req.user.id; // Asigna el usuario autenticado como creador
        const newProject = await addProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
});

// Obtener proyectos de un usuario
router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        const userId = req.params.userId;
        const projects = await getProjectsByUser(userId);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
});

// Actualizar un proyecto
router.put('/:projectId', authenticateToken, async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const updates = req.body;
        const updatedProject = await updateProject(projectId, updates);
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
});

// Eliminar un proyecto
router.delete('/:projectId', authenticateToken, async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const deletedProject = await deleteProject(projectId);
        res.status(200).json(deletedProject);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
});

module.exports = router;
