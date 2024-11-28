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

    console.log('si llega a la ruta')
    try {
        const projectData = req.body;
        projectData.userId = req.user.id; // Asigna el usuario autenticado como creador
        const newProject = await addProject(projectData);
        res.status(201).json(newProject);
    } catch (error) {
        const statusCode = error.status || 500;
        const errorMessage = error.status === 405 
            ? 'Titulo duplicado. Cambie el titulo' 
            : 'Error al crear el proyecto';
        
        res.status(statusCode).json({ error: errorMessage });
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

//dar like a un proyecto
router.post('/:id/like', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.likes += 1;
      await project.save();
  
      res.json({ likes: project.likes });
    } catch (error) {
      res.status(500).json({ message: 'Error liking project' });
    }
});

//agregar un comentario
router.post('/:id/comments', async (req, res) => {
    try {
      const { text } = req.body;
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.comments.push({ text });
      await project.save();
  
      res.json(project.comments);
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment' });
    }
});



  //dar like a un comentario
router.post('/:projectId/comments/:commentId/like', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const comment = project.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.likes += 1;
    await project.save();

    res.json({ likes: comment.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment' });
  }
});



//agregar una respuesta a un comentario
router.post('/:projectId/comments/:commentId/reply', async (req, res) => {
    try {
      const { text } = req.body;
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      const comment = project.comments.id(req.params.commentId);
      if (!comment) return res.status(404).json({ message: 'Comment not found' });
  
      comment.replies.push({ text });
      await project.save();
  
      res.json(comment.replies);
    } catch (error) {
      res.status(500).json({ message: 'Error adding reply' });
    }
});




module.exports = router;
