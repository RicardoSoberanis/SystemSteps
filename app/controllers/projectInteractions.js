const Project = require('../models/projectModel');

// Manejo de likes
const addProjectLike = async (projectId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) throw new Error('Proyecto no encontrado');
        
        project.likes += 1;
        return await project.save();
    } catch (error) {
        throw new Error('Error al dar like al proyecto: ' + error.message);
    }
};

// Manejo de comentarios
const addComment = async (projectId, userId, text) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) throw new Error('Proyecto no encontrado');

        project.comments.push({ userId, text });
        return await project.save();
    } catch (error) {
        throw new Error('Error al agregar comentario: ' + error.message);
    }
};

const addCommentLike = async (projectId, commentId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) throw new Error('Proyecto no encontrado');

        const comment = project.comments.id(commentId);
        if (!comment) throw new Error('Comentario no encontrado');

        comment.likes += 1;
        return await project.save();
    } catch (error) {
        throw new Error('Error al dar like al comentario: ' + error.message);
    }
};

// Manejo de respuestas
const addReply = async (projectId, commentId, userId, text) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) throw new Error('Proyecto no encontrado');

        const comment = project.comments.id(commentId);
        if (!comment) throw new Error('Comentario no encontrado');

        comment.replies.push({ userId, text });
        return await project.save();
    } catch (error) {
        throw new Error('Error al agregar respuesta: ' + error.message);
    }
};

const addReplyLike = async (projectId, commentId, replyId) => {
    try {
        const project = await Project.findById(projectId);
        if (!project) throw new Error('Proyecto no encontrado');

        const comment = project.comments.id(commentId);
        if (!comment) throw new Error('Comentario no encontrado');

        const reply = comment.replies.id(replyId);
        if (!reply) throw new Error('Respuesta no encontrada');

        reply.likes += 1;
        return await project.save();
    } catch (error) {
        throw new Error('Error al dar like a la respuesta: ' + error.message);
    }
};

module.exports = {
    addProjectLike,
    addComment,
    addCommentLike,
    addReply,
    addReplyLike,
};