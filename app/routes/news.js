const express = require("express");
const router = express.Router();
const { scrapeLatestNews } = require('../controllers/newsScrapper'); // Importa la función de scraping

router.get('/', async (req, res) => {
    try {
        // Llama al scraper para obtener las noticias
        const news = await scrapeLatestNews();
        
        // Devuelve las noticias en formato JSON
        res.status(200).json({
            success: true,
            data: news
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las noticias:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las noticias'
        });
    }
});

module.exports = router;
