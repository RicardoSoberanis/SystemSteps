const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multerConfig');
const authenticateToken = require('../middlewares/authMiddleware');
const {
    addProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
    getProjectById
} = require('../controllers/projects');
const {
    getAllProjects,
    getProjectsByCategory,
    getProjectsByProfessor,
    getProjectsByClass,
    getProjectsByLanguage,
} = require('../controllers/projectQueries');
const {
    addProjectLike,
    addComment,
    addCommentLike,
    addReply,
    addReplyLike,
} = require('../controllers/projectInteractions');

// Rutas para CRUD básico
router.post('/', authenticateToken, upload.single('banner'), async (req, res) => {
    try {
        const projectData = req.body;
        if (req.file) {
            projectData.banner = `/uploads/${req.file.filename}`;
        }
        projectData.userId = req.user.id;
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

// Rutas de búsqueda
router.get('/', async (req, res) => {
    try {
        const { category, professor, projectClass, language } = req.query;
        let projects;

        if (category) {
            projects = await getProjectsByCategory(category);
        } else if (professor) {
            projects = await getProjectsByProfessor(professor);
        } else if (projectClass) {
            projects = await getProjectsByClass(projectClass);
        } else if (language) {
            projects = await getProjectsByLanguage(language);
        } else {
            projects = await getAllProjects();
        }

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// In projects route file
router.get('/:projectId', async (req, res) => {
  try {
      const project = await getProjectById(req.params.projectId);
      res.status(200).json(project);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

router.get('/user/:userId', authenticateToken, async (req, res) => {
    try {
        const projects = await getProjectsByUser(req.params.userId);
        console.log(projects)
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
});

// Rutas de interacción
router.post('/:projectId/like', authenticateToken, async (req, res) => {
    try {
        const project = await addProjectLike(req.params.projectId);
        res.json({ likes: project.likes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:projectId/comments', async (req, res) => {
  try {
      const project = await Project.findById(req.params.projectId)
          .populate({
              path: 'comments.user',
              select: 'usuario'
          })
          .populate({
              path: 'comments.replies.user',
              select: 'usuario'
          });
      res.json(project.comments);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

router.post('/:projectId/comments/:commentId/like', authenticateToken, async (req, res) => {
    try {
        const project = await addCommentLike(req.params.projectId, req.params.commentId);
        const comment = project.comments.id(req.params.commentId);
        res.json({ likes: comment.likes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:projectId/comments/:commentId/reply', authenticateToken, async (req, res) => {
    try {
        const project = await addReply(
            req.params.projectId,
            req.params.commentId,
            req.user.id,
            req.body.text
        );
        const comment = project.comments.id(req.params.commentId);
        res.json(comment.replies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:projectId/comments/:commentId/replies/:replyId/like', authenticateToken, async (req, res) => {
    try {
        const project = await addReplyLike(
            req.params.projectId,
            req.params.commentId,
            req.params.replyId
        );
        const comment = project.comments.id(req.params.commentId);
        const reply = comment.replies.id(req.params.replyId);
        res.json({ likes: reply.likes });
    } catch (error) {
        res.status(500).json({ error: error.message });
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