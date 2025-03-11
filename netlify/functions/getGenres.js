const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    console.log('Iniciando función getGenres');
    
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
            console.error('API_KEY no está configurada');
            throw new Error('API_KEY no está configurada');
        }

        console.log('Haciendo solicitud a RAWG API');
        const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;
        console.log('URL:', url);

        const response = await fetch(url);
        console.log('Respuesta de RAWG:', response.status, response.statusText);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error en RAWG API:', errorText);
            throw new Error(`Error en la API: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos de RAWG:', data);
        
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
        console.error('Error en getGenres:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                error: 'Error al obtener los géneros',
                details: error.message
            })
        };
    }
}; 