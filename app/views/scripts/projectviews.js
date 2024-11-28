import { getUserById } from '../api/userApi.js';

async function fetchProjectDetails() {
    // Extract project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if (!projectId) {
        alert('No se proporcionó un ID de proyecto');
        return;
    }

    try {
        // Fetch project details
        const response = await fetch(`http://localhost:3000/projects/${projectId}`);
        const project = await response.json();

        // Populate project details
        document.getElementById('project-banner-img').src = project.banner || './img/default-project.jpg';
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-content').innerHTML = marked.parse(project.content);

        // Fetch and populate user details
        const user = await getUserById(project.userId);
        document.getElementById('project-author').textContent = user.usuario || 'Usuario Anónimo';
        
        document.getElementById('project-category').textContent = project.category;
        document.getElementById('project-languages').textContent = project.languages.join(', ');
        document.getElementById('project-class').textContent = project.projectClass;
        document.getElementById('project-professor').textContent = project.professor;
        
        // Likes
        document.getElementById('project-likes').textContent = project.likes || 0;

        // Setup like button
        const likeButton = document.getElementById('like-project-btn');
        likeButton.addEventListener('click', () => likeProject(projectId));

        // Load comments
        await loadComments(projectId);

        // Setup comment submission
        document.getElementById('submit-comment-btn').addEventListener('click', () => submitComment(projectId));
    } catch (error) {
        console.error('Error fetching project details:', error);
        alert('No se pudo cargar el proyecto');
    }
}

async function likeProject(projectId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/projects/${projectId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        document.getElementById('project-likes').textContent = data.likes;
    } catch (error) {
        console.error('Error liking project:', error);
        alert('No se pudo dar like al proyecto');
    }
}

async function loadComments(projectId) {
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.innerHTML = ''; // Clear existing comments

    try {
        const response = await fetch(`http://localhost:3000/projects/${projectId}/comments`);
        const comments = await response.json();

        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

async function submitComment(projectId) {
    const commentText = document.getElementById('new-comment-text').value.trim();
    if (!commentText) return;

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/projects/${projectId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: commentText })
        });
        
        const updatedComments = await response.json();
        await loadComments(projectId);
        
        // Clear comment input
        document.getElementById('new-comment-text').value = '';
    } catch (error) {
        console.error('Error submitting comment:', error);
        alert('No se pudo publicar el comentario');
    }
}

function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'card mb-2';
    commentDiv.innerHTML = `
        <div class="card-body">
            <h6 class="card-subtitle mb-2 text-muted">${comment.user.usuario}</h6>
            <p class="card-text">${comment.text}</p>
            <div class="d-flex justify-content-between align-items-center">
                <button class="btn btn-sm btn-outline-secondary like-comment-btn" 
                    data-comment-id="${comment._id}">
                    <i class="fas fa-heart"></i> ${comment.likes || 0} Likes
                </button>
                <button class="btn btn-sm btn-outline-primary reply-comment-btn" 
                    data-comment-id="${comment._id}">Responder</button>
            </div>
            <div class="replies-container mt-2"></div>
        </div>
    `;

    // Add event listeners for like and reply
    const likeCommentBtn = commentDiv.querySelector('.like-comment-btn');
    likeCommentBtn.addEventListener('click', () => likeComment(comment._id));

    const replyCommentBtn = commentDiv.querySelector('.reply-comment-btn');
    replyCommentBtn.addEventListener('click', () => showReplyForm(commentDiv, comment._id));

    // Render replies
    const repliesContainer = commentDiv.querySelector('.replies-container');
    comment.replies.forEach(reply => {
        const replyElement = createReplyElement(reply);
        repliesContainer.appendChild(replyElement);
    });

    return commentDiv;
}

function createReplyElement(reply) {
    const replyDiv = document.createElement('div');
    replyDiv.className = 'card card-body bg-light mb-1';
    replyDiv.innerHTML = `
        <h6 class="card-subtitle mb-2 text-muted">${reply.user.usuario}</h6>
        <p class="card-text">${reply.text}</p>
        <div class="d-flex justify-content-end">
            <button class="btn btn-sm btn-outline-secondary like-reply-btn" 
                data-reply-id="${reply._id}">
                <i class="fas fa-heart"></i> ${reply.likes || 0} Likes
            </button>
        </div>
    `;

    return replyDiv;
}

function showReplyForm(commentDiv, commentId) {
    // Implementation of reply form
    // Similar to comment submission but with specific endpoint
}

async function likeComment(commentId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/projects/comments/${commentId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        // Update like count
    } catch (error) {
        console.error('Error liking comment:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', fetchProjectDetails);