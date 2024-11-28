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

        // Perfil principal
        document.querySelector('.profile-img').src = userData.imageProfile || 'https://st4.depositphotos.com/11574170/25191/v/450/depositphotos_251916955-stock-illustration-user-glyph-color-icon.jpg';
        document.querySelector('.card-profile h4').textContent = userData.usuario;
        document.querySelector('.card-profile .text-secondary').textContent = userData.rango;
        document.querySelector('.card-profile .text-muted').textContent = userData.carrera;

        // Redes sociales
        const socialLinks = document.querySelectorAll('.card-profile .list-group-item span');
        socialLinks[0].textContent = userData.gitHubUser || 'Agregar';
        socialLinks[1].textContent = userData.linkedInUser || 'Agregar';

        // Detalles del usuario
        const detailRows = document.querySelectorAll('.card-profile .row');
        detailRows[0].querySelector('.col-sm-9').textContent = userData.name;
        detailRows[1].querySelector('.col-sm-9').textContent = userData.email;
        detailRows[2].querySelector('.col-sm-9').textContent = userData.edad;
        detailRows[3].querySelector('.col-sm-9').textContent = userData._id;
        detailRows[4].querySelector('.col-sm-9').textContent = userData.puntos;
        detailRows[5].querySelector('.col-sm-9').textContent = userData.insignias.length;

    } catch (error) {
        console.error("Error al obtener información del usuario:", error);
        alert("Error en la conexión con el servidor.");
    }
    

    
});


