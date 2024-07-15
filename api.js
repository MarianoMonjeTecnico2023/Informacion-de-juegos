const apiKeyRawg = '0d589afd88f349639185ad655f60be5d';
const baseUrl = 'https://api.rawg.io/api/games';
const pageSize =10;
const groupedPlatforms = {   
'PC': [
      { id: 4, name: "PC" },
        { id: 5, name: "macOS" },
        { id: 6, name: "Linux" }
    ],
    'PlayStation': [ 
      { id: 187, name: "PlayStation 5" },
      { id: 18, name: "PlayStation 4" },
      { id: 16, name: "PlayStation 3" },
      { id: 15, name: "PlayStation 2" },
      { id: 27, name: "PlayStation" },
      { id: 19, name: "PS Vita" },
      { id: 17, name: "PSP" }
    ],
    'Xbox': [
      { id: 1, name: "Xbox One" },
      { id: 186, name: "Xbox Series S/X" },
      { id: 14, name: "Xbox 360" },
      { id: 80, name: "Xbox" }
    ],
    'Nintendo': [
      { id: 7, name: "Nintendo Switch" },
      { id: 8, name: "Nintendo 3DS" },
      { id: 9, name: "Nintendo DS" },
      { id: 13, name: "Nintendo DSi" },
      { id: 10, name: "Wii U" },
      { id: 11, name: "Wii" },
      { id: 105, name: "GameCube" },
      { id: 83, name: "Nintendo 64" },
      { id: 24, name: "Game Boy Advance" },
      { id: 43, name: "Game Boy Color" },
      { id: 26, name: "Game Boy" },
      { id: 79, name: "SNES" },
      { id: 49, name: "NES" }
    ],
    'Móvil': [
      { id: 3, name: "iOS" },
      { id: 21, name: "Android" }
    ],
    'Otras': [
      { id: 166, name: "Commodore / Amiga" },
      { id: 112, name: "Jaguar" },
      { id: 171, name: "Web" }, // Se agregó Web como una plataforma separada
      
     
    ]
  };
  const genresES = {
    'action': 'Acción',
    'indie': 'Independientes',
    'adventure': 'Aventura',
    'role-playing-games-rpg': 'RPG o Juegos de Rol',
    'strategy': 'Estrategia',
    'shooter': 'Disparos',
    'casual': 'Casual',
    'simulation': 'Simulación',
    'puzzle': 'Puzle',
    'arcade': 'Arcade',
    'platformer': 'Plataformas',
    'racing': 'Carreras',
    'massively-multiplayer': 'Multijugador Masivo',
    'sports': 'Deportes',
    'fighting': 'Lucha',
    'family': 'Familiar',
    'board-games': 'Juegos de Mesa',
    'educational' : 'Educativo',
    'card' : 'Cartas',
  };
  
  async function getGameDetails(gameId) {
    const url = `${baseUrl}/${gameId}?key=${apiKeyRawg}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la solicitud de detalles: ${response.status}`);
      }
      const data = await response.json();
  
      // No intentar dividir la descripción si no contiene "Español"
      // Simplemente devolver los datos tal como vienen de la API
      return data; 
    } catch (error) {
      console.error(`Error al obtener detalles del juego ${gameId}:`, error);
      return null;
    }
  }

async function getGames(platformId, genreId, page = 1) {
  const url = `${baseUrl}?key=${apiKeyRawg}&platforms=${platformId}&genres=${genreId}&page=${page}&page_size=5`; 

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return await response.json();
  } catch (error) {
      console.error(`Error al obtener juegos para plataforma ${platformId}, género ${genreId}, página ${page}:`, error);
      return { results: [] }; // Devolver un objeto con un array vacío si hay un error
  }
}
async function getGenres() {
  const genresUrl = 'https://api.rawg.io/api/genres';
  try {
      const response = await fetch(`${genresUrl}?key=${apiKeyRawg}`); 
      if (!response.ok) {
          throw new Error(`Error en la solicitud de géneros: ${response.status}`);
      }
      
      const data = await response.json();
   
      return data.results;
  } catch (error) {
      console.error('Error al obtener los géneros:', error);
      return []; 
  }
}
async function getPlataformas() {
  const platformsUrl = "https://api.rawg.io/api/platforms";
  try {
      const response = await fetch(`${platformsUrl}?key=${apiKeyRawg}`);
      if (!response.ok) {
          throw new Error(`Error en la solicitud de plataformas: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error('Error al obtener las plataformas:', error);
      return [];
  }
}
async function translateDescription(descriptionHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(descriptionHtml, 'text/html');
  const pElements = doc.querySelectorAll('p');
  const parrafos = Array.from(pElements).map(p => p.textContent);

  const traducciones = await traducirParrafosEnLotes(parrafos);

  pElements.forEach((p, index) => {
    p.textContent = traducciones[index];
  });

  return doc.documentElement.outerHTML;
}

async function traducirParrafosEnLotes(parrafos) {
  const traducciones = [];
  const loteSize = 5; // Tamaño del lote de traducción
  for (let i = 0; i < parrafos.length; i += loteSize) {
    const lote = parrafos.slice(i, i + loteSize);
    const traduccionesLote = await Promise.all(lote.map(translateParrafo));
    traducciones.push(...traduccionesLote);
  }
  return traducciones;
}

async function translateParrafo(parrafo) {
  
    const url = `https://cors-anywhere.herokuapp.com/https://api-free.deepl.com/v2/translate`; // Usar el proxy CORS
    const authKey = '1cb8da8d-68ab-4296-818b-0641aa0afce0:fx'; // Tu clave API de DeepL
  
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${authKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        text: parrafo,
        source_lang: 'EN', // Idioma de origen (inglés)
        target_lang: 'ES'  // Idioma de destino (español)
      })
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error en la traducción (DeepL): ${response.status}`);
      }
      const data = await response.json();
      return data.translations[0].text; // Extraer el texto traducido de la respuesta
    } catch (error) {
      console.error('Error al traducir párrafo:', error);
      return parrafo; // Devolver el párrafo original en caso de error
    }
  }
  
  const juegosMostrados = new Set();
  
  export {
    apiKeyRawg,
    baseUrl,
    pageSize,
    genresES,
    getGameDetails,
    getGames,
    getGenres,
    getPlataformas,
    translateDescription,
    traducirParrafosEnLotes,
    translateParrafo,
    juegosMostrados,
  };