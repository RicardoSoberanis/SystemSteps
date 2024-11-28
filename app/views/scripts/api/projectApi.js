// Funciones relacionadas con la API de proyectos
export async function fetchProjects(params = {}) {
    try {
        let url = 'http://localhost:3000/projectsHandler';
        if (Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener proyectos');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}