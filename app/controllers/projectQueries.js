const Project = require('../models/projectModel');

// Búsqueda de proyectos por diferentes criterios
const getAllProjects = async () => {
    try {
        return await Project.find().populate('userId', 'name email imageProfile');
    } catch (error) {
        throw new Error('Error al obtener todos los proyectos: ' + error.message);
    }
};

const getProjectsByCategory = async (category) => {
    try {
        return await Project.find({ category }).populate('userId', 'name email imageProfile');
    } catch (error) {
        throw new Error('Error al obtener proyectos por categoría: ' + error.message);
    }
};

const getProjectsByProfessor = async (professor) => {
    try {
        return await Project.find({ professor }).populate('userId', 'name email imageProfile');
    } catch (error) {
        throw new Error('Error al obtener proyectos por profesor: ' + error.message);
    }
};

const getProjectsByClass = async (projectClass) => {
    try {
        return await Project.find({ projectClass }).populate('userId', 'name email imageProfile');
    } catch (error) {
        throw new Error('Error al obtener proyectos por clase: ' + error.message);
    }
};

const getProjectsByLanguage = async (language) => {
    try {
        return await Project.find({ languages: { $in: [language] } })
            .populate('userId', 'name email imageProfile');
    } catch (error) {
        throw new Error('Error al obtener proyectos por lenguaje: ' + error.message);
    }
};

module.exports = {
    getAllProjects,
    getProjectsByCategory,
    getProjectsByProfessor,
    getProjectsByClass,
    getProjectsByLanguage,
};