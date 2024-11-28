import {
    displayPopularProjects,
    displayRecentProjects,
    initializeFilterSection,
} from './sections/projectSections.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Muestra proyectos populares y recientes
    await Promise.all([
        displayPopularProjects(),
        displayRecentProjects()
    ]);

    // Inicializa las secciones de filtros
    ['lenguajes', 'categorias', 'materias', 'profesores'].forEach(type => {
        initializeFilterSection(type);
    });
});
