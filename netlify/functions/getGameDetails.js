const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // Manejar solicitudes OPTIONS para CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    try {
        const API_KEY = process.env.RAWG_API_KEY;
        if (!API_KEY) {
            throw new Error('API_KEY no está configurada');
        }

        const { gameId } = JSON.parse(event.body);
        const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`;
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
        console.error('Error en getGameDetails:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Error al obtener los detalles del juego',
                details: error.message
            })
        };
    }
}; 