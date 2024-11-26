const Project = require('../models/projectModel');

// Crear un nuevo proyecto
const addProject = async (projectData) => {
    try {
        const newProject = new Project(projectData);
        const savedProject = await newProject.save();
        console.log('Proyecto creado:', savedProject);
        return savedProject;
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        throw error;
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

module.exports = {
    addProject,
    getProjectsByUser,
    updateProject,
    deleteProject,
};
