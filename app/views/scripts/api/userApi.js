// Funciones relacionadas con la API de usuarios
export const getToken = () => localStorage.getItem('token');

export async function getUserById(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/find`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if (!response.ok) throw new Error('Error al obtener usuario');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}