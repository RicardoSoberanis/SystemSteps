import { fetchProjects } from '../api/projectApi.js';
import { createProjectCard } from '../components/projectCard.js';
import { createFilterButtons } from '../components/filterButtons.js';

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

export async function displayFilteredProjects(filterType, filterValue, contentContainer) {
    if (!contentContainer) return;
    if(filterType == 'categorias') filterType = 'category';
    if(filterType == 'profesores') filterType = 'professor';
    if(filterType == 'materia') filterType = 'projectClass';
    if(filterType == 'lenguajes') filterType = 'languages';

    const params = { [filterType]: filterValue };
    const projects = await fetchProjects(params);

    contentContainer.innerHTML = '';
    projects.forEach(project => {
        contentContainer.appendChild(createProjectCard(project));
    });
}

export function initializeFilterSection(filterType) {
    const buttonContainer = document.querySelector(`.container-${filterType}`);
    const contentContainer = document.querySelector(`.container-${filterType}-content`);

    if (!buttonContainer || !contentContainer) {
        console.warn(`Contenedor para ${filterType} no encontrado.`);
        return;
    }

    createFilterButtons(buttonContainer, filterType);

    buttonContainer.addEventListener('click', async (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const filterValue = button.dataset.filterValue;
        console.log(filterValue)
        await displayFilteredProjects(filterType, filterValue, contentContainer);
    });
}
