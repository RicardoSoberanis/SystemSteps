document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.token;

    try {
        const response = await fetch("http://localhost:3000/users/find", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData);
            alert(`Error: ${errorData.message || "No autorizado"}`);
            return;
        }

        // Obtener los datos del usuario
        const userData = await response.json();

        // Guardar los datos del usuario en sessionStorage como string
        sessionStorage.setItem('user', JSON.stringify(userData));

        alert("Información de usuario guardada exitosamente");
    } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        alert("Error en la conexión con el servidor.");
    }


    
});


