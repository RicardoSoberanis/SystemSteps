const Project = require('../models/projectModel');

const addProject = async (projectData) => {
    try {
        // Verificar si ya existe un proyecto con el mismo título y usuario
        const existingProject = await Project.findOne({ title: projectData.title, userId: projectData.userId });
        if (existingProject) {
            const error = new Error('Ya existe un proyecto con este título. Por favor, elige otro título.');
            error.status = 405; // Error de cliente
            throw error;
        }

        // Crear el nuevo proyecto si no hay duplicados
        const newProject = new Project(projectData);
        const savedProject = await newProject.save();
        console.log('Proyecto creado:', savedProject);
        return savedProject;
    } catch (error) {
        console.error('Error al crear proyecto:', error.message);
        throw error; // Propagar el error para que la ruta lo maneje
    }
};

// Obtener proyectos de un usuario específico
const getProjectsByUser = async (userId) => {
    try {
        const projects = await Project.find({ userId }).populate('userId', 'name email');
        return projects;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error;
    }
};

// Actualizar un proyecto
const updateProject = async (projectId, updates) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true });
        if (!updatedProject) {
            console.log('Proyecto no encontrado para actualizar');
            return null;
        }
        return updatedProject;
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        throw error;
    }
};

// Eliminar un proyecto
const deleteProject = async (projectId) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            console.log('Proyecto no encontrado para eliminar');
            return null;
        }
        return deletedProject;
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        throw error;
    }
};

const getProjectById = async (projectId) => {
    try {
        const project = await Project.findById(projectId)
            .populate('userId', 'usuario email'); // Populate user details
        if (!project) {
            throw new Error('Proyecto no encontrado');
        }
        return project;
    } catch (error) {
        console.error('Error al obtener proyecto:', error);
        throw error;
    }
};

// subir la imagen
// Las funciones de los proyectos

module.exports = {
    addProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
    getProjectById
};
