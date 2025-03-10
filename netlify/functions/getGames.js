const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const API_KEY = process.env.RAWG_API_KEY;
        if (!API_KEY) {
            throw new Error('API_KEY no está configurada');
        }

        // Verificar si tenemos un body
        if (!event.body) {
            throw new Error('No se recibieron parámetros');
        }

        const { platformIds, genreId, page } = JSON.parse(event.body);
        
        // Asegurarse de que platformIds es un array
        const platformIdsArray = Array.isArray(platformIds) ? platformIds : [platformIds];
        const platformIdsString = platformIdsArray.join(',');
        
        const url = `https://api.rawg.io/api/games?key=${API_KEY}&platforms=${platformIdsString}&genres=${genreId}&page=${page}&page_size=5`;
        console.log('URL de la solicitud:', url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status}`);
        }
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Error en getGames:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Error al obtener los juegos',
                details: error.message
            })
        };
    }
}; 