import { fetchProjects } from '../api/projectApi.js';
import { createProjectCard } from '../components/projectCard.js';

export async function displayPopularProjects() {
    const container = document.querySelector('.container-populares');
    if (!container) return;

    const projects = await fetchProjects();
    const popularProjects = projects
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 6);

    container.innerHTML = '';
    popularProjects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

export async function displayRecentProjects() {
    const container = document.querySelector('.container-recientes');
    if (!container) return;

    const projects = await fetchProjects();
    const recentProjects = projects
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    container.innerHTML = '';
    recentProjects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

export async function displayCategoryProjects() {
    const container = document.querySelector('.container-categorias-content');
    if (!container) return;

    const projects = await fetchProjects({ category: 'all' });
    container.innerHTML = '';
    projects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

export async function displayLanguageProjects() {
    const container = document.querySelector('.container-lenguajes-content');
    if (!container) return;

    const projects = await fetchProjects({ language: 'all' });
    container.innerHTML = '';
    projects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

export async function displayClassProjects() {
    const container = document.querySelector('.container-materias-content');
    if (!container) return;

    const projects = await fetchProjects({ projectClass: 'all' });
    container.innerHTML = '';
    projects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}

export async function displayProfessorProjects() {
    const container = document.querySelector('.container-profesores-content');
    if (!container) return;

    const projects = await fetchProjects({ professor: 'all' });
    container.innerHTML = '';
    projects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
}