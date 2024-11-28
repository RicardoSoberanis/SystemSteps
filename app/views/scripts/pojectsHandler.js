import {
    displayPopularProjects,
    displayRecentProjects,
    displayCategoryProjects,
    displayLanguageProjects,
    displayClassProjects,
    displayProfessorProjects
} from './sections/projectSections.js';

// Inicializar todas las secciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        displayPopularProjects(),
        displayRecentProjects(),
        displayCategoryProjects(),
        displayLanguageProjects(),
        displayClassProjects(),
        displayProfessorProjects()
    ]);
}); 