import { getUserById } from '../api/userApi.js';

export function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'col-md-4 projectCard';
    
    const bannerUrl = project.banner || './img/default-project.jpg';
    
    card.innerHTML = `
        <div class="card h-100">
            <img src="${bannerUrl}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Por: <span class="project-author">Cargando...</span></small>
                </p>
                <p class="card-text">
                    <i class="fas fa-heart"></i> ${project.likes || 0} likes
                </p>
            </div>
        </div>
    `;

    if (project.userId) {
        getUserById(project.userId).then(user => {
            if (user) {
                const authorSpan = card.querySelector('.project-author');
                authorSpan.textContent = user.username || 'Usuario Anónimo';
            }
        });
    }

    return card;
}