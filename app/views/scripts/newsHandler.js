function createNewsCards(newsData) {
    const container = document.querySelector('.container .row'); // Selecciona el contenedor de cards existente
    
    container.innerHTML = '';
    
    newsData.forEach(news => {
        const cardHTML = `
            <div class="col-md-4 mb-4">
                <a href="${news.link}" target="_blank" class="text-decoration-none">
                    <div class="article-card">
                        <img src="${news.img}" alt="${news.title}">
                        <div class="content">
                            <p class="date">${news.date}</p>
                            <p class="title">${news.title}</p>
                        </div>
                    </div>
                </a>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

async function fetchNews() {
    try {
        const response = await fetch('http://localhost:3000/news/'); // URL de la API
        const data = await response.json();
        
        if (data.success) {
            createNewsCards(data.data);
        } else {
            console.error('Error al obtener las noticias:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Ejecuta la función al cargar el DOM
document.addEventListener('DOMContentLoaded', fetchNews);
