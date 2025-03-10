const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const API_KEY = process.env.RAWG_API_KEY;
    const { gameId } = JSON.parse(event.body);
    
    try {
        const response = await fetch(
            `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`
        );
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener los detalles del juego' })
        };
    }
}; 