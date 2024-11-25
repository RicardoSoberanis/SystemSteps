const puppeteer = require('puppeteer');

// Función para inicializar Puppeteer y extraer las noticias
const scrapeLatestNews = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navega a la página
    await page.goto('https://noticias.iteso.mx/', { waitUntil: 'networkidle2' });

    // Extrae las últimas 10 noticias
    const articles = await page.$$eval('.cards.tooltipx', (cards) =>
        cards.slice(0, 10).map((card) => {
            const title = card.querySelector('.titulo')?.innerText.trim() || '';
            const date = card.querySelector('.fecha')?.innerText.trim() || '';
            const link = card.href || '';
            const img = card.querySelector('img')?.src || '';
            return { title, date, link, img };
        })
    );

    await browser.close(); // Cierra el navegador
    return articles; // Devuelve las noticias extraídas
};

// Exporta la función
module.exports = { scrapeLatestNews };
