const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const API_KEY = process.env.RAWG_API_KEY;
        if (!API_KEY) {
            throw new Error('API_KEY no está configurada');
        }

        if (!event.body) {
            throw new Error('No se recibieron parámetros');
        }

        const { gameId } = JSON.parse(event.body);
        if (!gameId) {
            throw new Error('gameId es requerido');
        }

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