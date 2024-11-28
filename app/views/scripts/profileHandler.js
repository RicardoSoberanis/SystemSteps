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
        document.querySelector('.card-profile h4').textContent = userData.usuario || userData.name;
        document.querySelector('.card-profile .text-secondary').textContent = userData.rango || 'Sin rango';
        document.querySelector('.card-profile .text-muted').textContent = userData.carrera || 'Sin carrera';

        // Redes sociales
        const socialLinks = document.querySelectorAll('.card-profile .list-group-item span');
        socialLinks[0].textContent = userData.gitHubUser || 'Agregar';
        socialLinks[1].textContent = userData.linkedInUser || 'Agregar';

        // Detalles del usuario
        const detailRows = document.querySelectorAll('.card-profile .row .col-sm-9');
        detailRows[0].textContent = userData.name || 'N/A';
        detailRows[1].textContent = userData.email || 'N/A';
        detailRows[2].textContent = userData.edad || 'N/A';
        detailRows[3].textContent = userData._id || 'N/A';
        detailRows[4].textContent = userData.puntos || '0';
        detailRows[5].textContent = userData.insignias ? userData.insignias.length : '0';

        // Fetch and display user projects
        const projectsResponse = await fetch("http://localhost:3000/projectsHandler", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (!projectsResponse.ok) {
            throw new Error('Failed to fetch projects');
        }

        const allProjects = await projectsResponse.json();
        
        // Filter projects by current user's ID
        const userProjects = allProjects.filter(project => 
            project.userId._id === userData._id
        );

        // Get the projects container and find the original title
        const projectsContainer = document.querySelector('.col-md-8 .row');
        const projectsTitle = projectsContainer.querySelector('h3');

        // Clear existing project cards but keep the title
        const projectCardsContainer = document.createElement('div');
        projectCardsContainer.appendChild(projectsTitle);

        // Generate project cards
        userProjects.forEach(project => {
            const projectColumn = document.createElement('div');
            projectColumn.className = 'col-md-4 mb-4';

            const projectLink = document.createElement('a');
            projectLink.href = '#'; // You might want to link to project detail page
            projectLink.target = '_blank';
            projectLink.className = 'text-decoration-none';

            const articleCard = document.createElement('div');
            articleCard.className = 'article-card';

            // Project banner image (use default if empty)
            const projectImage = document.createElement('img');
            projectImage.src = project.banner || './img/grey.jpg';
            projectImage.alt = project.title;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';

            const dateP = document.createElement('p');
            dateP.className = 'date';
            dateP.textContent = new Date(project.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            const titleP = document.createElement('p');
            titleP.className = 'title';
            titleP.textContent = project.title;

            // Assemble the card
            contentDiv.appendChild(dateP);
            contentDiv.appendChild(titleP);
            articleCard.appendChild(projectImage);
            articleCard.appendChild(contentDiv);
            projectLink.appendChild(articleCard);
            projectColumn.appendChild(projectLink);

            // Add to projects container
            projectCardsContainer.appendChild(projectColumn);
        });

        // Replace the content of the original projects container
        projectsContainer.innerHTML = projectCardsContainer.innerHTML;

    } catch (error) {
        console.error("Error:", error);
        alert("Error en la conexión con el servidor.");
    }
});


