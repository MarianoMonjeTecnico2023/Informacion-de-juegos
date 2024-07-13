const apiKeyRawg = 'aa1b07ed5a19405c8f1b149d24149c3c';
const baseUrl = 'https://api.rawg.io/api/games';
const pageSize =5;
const juegosMostrados = new Set();
const groupedPlatforms = {   
'PC': [
      { id: 4, name: "PC" } // PC 
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
      { id: 5, name: "macOS" },
      { id: 6, name: "Linux" }
    ]
  };
  const genresES = {
    'action': 'Acción',
    'indie': 'Independientes',
    'adventure': 'Aventura',
    'role-playing-games-rpg': 'RPG o Juegos de Rol',
    'strategy': 'Estrategia',
    'Sshooter': 'Disparos',
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
async function createGameElement(game) {
  const gameDiv = document.createElement('div');
  gameDiv.classList.add('juego');

  const image = document.createElement('img');
  image.src = game.background_image || 'imagen_por_defecto.jpg';
  image.alt = game.name;
  gameDiv.appendChild(image);

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info-juego');
  gameDiv.appendChild(infoDiv);

  const title = document.createElement('h3');
  title.textContent = game.name;
  infoDiv.appendChild(title);

  // Mostrar todos los géneros del juego, utilizando el diccionario genresES
  const translatedGenres = game.genres.map(g => genresES[g.slug] || g.name);
  const genreElement = document.createElement('p');
  genreElement.textContent = `Géneros: ${translatedGenres.join(', ')}`;
  infoDiv.appendChild(genreElement);

  // Obtener detalles del juego (incluyendo la descripción)
  const gameDetails = await getGameDetails(game.id);

  if (gameDetails) {
    const translatedDescriptionHtml = await translateDescription(gameDetails.description); // Traducir la descripción completa

    // Descripción limitada con "Leer más" (usando la descripción traducida)
    const descripcionOriginal = translatedDescriptionHtml || 'No hay descripción disponible.'; // Descripción traducida
    const descripcionSinHtml = descripcionOriginal.replace(/<[^>]+>/g, '');
    const palabrasDescripcion = descripcionSinHtml.split(/\s+/);

    const maxPalabras = 50;
    const descripcionCorta = palabrasDescripcion.slice(0, maxPalabras).join(' ');
    let descripcionMostrada = descripcionCorta;

    const description = document.createElement('p');
    description.innerHTML = descripcionMostrada + (palabrasDescripcion.length > maxPalabras ? '...' : ''); // Usar innerHTML para mantener las etiquetas <p>

    // Crear el enlace "Leer más"
    const leerMasLink = document.createElement('a');
    leerMasLink.href = '#';
    leerMasLink.textContent = 'Leer más';
    leerMasLink.classList.add('leer-mas');

    leerMasLink.addEventListener('click', (event) => {
      event.preventDefault();
      descripcionMostrada = descripcionOriginal;
      description.innerHTML = descripcionMostrada; // Usar innerHTML para mostrar la descripción completa con etiquetas <p>
      leerMasLink.remove();
    });

    // Agregar la descripción y el enlace (si es necesario) al contenedor
    infoDiv.appendChild(description);
    if (palabrasDescripcion.length > maxPalabras) {
      infoDiv.appendChild(leerMasLink);
    }
    // Mostrar plataformas sin traducir (directamente de la API)
    const platformNames = gameDetails.platforms.map(p => p.platform.name);
    const platformElement = document.createElement('p');
    platformElement.textContent = `Plataformas: ${platformNames.join(', ')}`;
    infoDiv.appendChild(platformElement);

    // Requisitos mínimos y recomendados (mostrar al final y limitados)
    if (gameDetails.platforms.some(p => p.platform.id === 4)) {
      const requirementsDiv = document.createElement('div');
      requirementsDiv.classList.add('requisitos');

      const platform = gameDetails.platforms.find(p => p.platform.id === 4);
      if (platform && platform.requirements) {
        addLimitedRequirements(requirementsDiv, platform.requirements.minimum, "Requisitos mínimos:");
        addLimitedRequirements(requirementsDiv, platform.requirements.recommended, "Requisitos recomendados:");
      } else {
        const noReqs = document.createElement('p');
        noReqs.textContent = 'Requisitos no disponibles.';
        requirementsDiv.appendChild(noReqs);
      }

      gameDiv.appendChild(requirementsDiv); // Agregar al final
    }
  }

  return gameDiv;
}

// Función para agregar requisitos limitados y con opción "Ver más"
function addLimitedRequirements(container, requirementsText, title) {
  if (!requirementsText) return; 

  const maxChars = 200; 

  let requisitosMostrados = requirementsText.slice(0, maxChars);
  if (requisitosMostrados.length < requirementsText.length) {
    requisitosMostrados += "...";
  }

  const reqsElement = document.createElement('p');
  reqsElement.innerHTML = `<strong>${title}</strong> ${requisitosMostrados}`;

  const verMasLink = document.createElement('a');
  verMasLink.href = '#';
  verMasLink.textContent = 'Ver más';
  verMasLink.classList.add('ver-mas');

  verMasLink.addEventListener('click', (event) => {
    event.preventDefault();
    reqsElement.innerHTML = `<strong>${title}</strong> ${requirementsText}`; 
    verMasLink.remove();
  });

  reqsElement.appendChild(verMasLink);
  container.appendChild(reqsElement);
}

async function main() {
  const genres = await getGenres();
  const platformsFromApi = await getPlataformas();
  const juegosMostrados = new Set();

  const menuPlataformas = document.getElementById('menu-plataformas');
  const contenidoJuegos = document.getElementById('contenido-juegos');

  // Agrupar plataformas de forma manual
  const groupedPlatforms = {
    'PC': platformsFromApi.filter(p => p.name === 'PC'),
    'Consolas Retro': platformsFromApi.filter(p => ['SNES', 'NES', 'Nintendo 64', 'GameCube', 'Commodore / Amiga', 'SEGA Master System', 'SEGA Saturn', 'SEGA CD', 'SEGA 32X'].includes(p.name)),
    'Móvil': platformsFromApi.filter(p => ['iOS', 'Android'].includes(p.name)),
    'Arcade': platformsFromApi.filter(p => p.name === 'Dreamcast'),
    'Consolas': platformsFromApi.filter(p => ['PS4', 'PS5', 'Xbox One', 'Xbox 360', 'Xbox Series S/X'].includes(p.name)),
  };

  // Crear secciones de plataformas y categorías
  for (const [platformGroupName, platforms] of Object.entries(groupedPlatforms)) {
    if (platforms.length === 0) continue;

    const section = document.createElement('section');
    section.id = `Juegos-${platformGroupName.toLowerCase().replace(/ /g, '-')}`;
    const sectionTitle = document.createElement('h2');
    sectionTitle.textContent = `Juegos de ${platformGroupName}`;
    section.appendChild(sectionTitle);

    // Crear enlace para el menú
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = sectionTitle.textContent;
    listItem.appendChild(link);
    menuPlataformas.appendChild(listItem);

    // Crear secciones de categorías dentro de la sección de la plataforma
    for (const genre of genres) {
      const categorySectionId = `${platformGroupName.toLowerCase().replace(/ /g, '-')}-${genre.name}`;
      const categorySection = document.createElement('section');
      categorySection.id = categorySectionId;

      const categoryTitle = document.createElement('h3');
categoryTitle.textContent = genresES[genre.slug] || genre.name; // Traducir o usar nombre original
categorySection.appendChild(categoryTitle);

      const gameList = document.createElement('div');
      gameList.classList.add('lista-juegos');
      categorySection.appendChild(gameList);

      // Crear contenedor para la paginación
      const paginationContainer = document.createElement('div');
      paginationContainer.id = `${categorySectionId}-pagination`;
      categorySection.appendChild(paginationContainer);

      section.appendChild(categorySection);
    }

    contenidoJuegos.appendChild(section);
  }

  // Obtener y mostrar los juegos
  for (const [platformGroupName, platforms] of Object.entries(groupedPlatforms)) {
    if (platforms.length === 0) continue;

    const platformName = platformGroupName.toLowerCase().replace(/ /g, '-');

    for (const genre of genres) {
      const genreId = genre.id;
      const categorySectionId = `${platformName}-${genre.name}`;
      const gameList = document.getElementById(categorySectionId)?.querySelector('.lista-juegos');
      let currentPage = 1;
      let nextPageUrl = `${baseUrl}?key=${apiKeyRawg}&platforms=${platforms.map(p => p.id).join(',')}&genres=${genreId}&page_size=${pageSize}`;

      // Función para cargar más juegos
      async function loadMoreGames() {
        const data = await getGames(platforms.map(p => p.id), genreId, currentPage + 1);
        if (data.results.length > 0) {
          currentPage++;
          for (const game of data.results) {
            if (!juegosMostrados.has(game.id)) {
              gameList.appendChild(await createGameElement(game));
              juegosMostrados.add(game.id);
            }
          }
          updatePagination(categorySectionId, currentPage, data.next);
        }
      }

      // Cargar los primeros juegos
      const initialData = await getGames(platforms.map(p => p.id), genreId, currentPage);
      for (const game of initialData.results) {
        if (!juegosMostrados.has(game.id)) {
          gameList.appendChild(await createGameElement(game));
          juegosMostrados.add(game.id);
        }
      }
      updatePagination(categorySectionId, currentPage, initialData.next);

      // Agregar el botón "Cargar más"
      const loadMoreButton = document.createElement('button');
      loadMoreButton.textContent = 'Cargar más';
      loadMoreButton.addEventListener('click', loadMoreGames);
      gameList.appendChild(loadMoreButton);
    }
  }
}

// Función para actualizar la paginación
function updatePagination(categorySectionId, currentPage, nextPageUrl) {
  const paginationContainer = document.getElementById(`${categorySectionId}-pagination`);
  if (!paginationContainer) return;

  paginationContainer.innerHTML = ''; // Limpiar paginación anterior

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Anterior';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    loadGames(categorySectionId, currentPage - 1); // Cargar página anterior
  });
  paginationContainer.appendChild(prevButton);

  const pageSpan = document.createElement('span');
  pageSpan.textContent = `Página ${currentPage}`;
  paginationContainer.appendChild(pageSpan);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Siguiente';
  nextButton.disabled = !nextPageUrl;
  nextButton.addEventListener('click', () => {
    loadGames(categorySectionId, currentPage + 1); // Cargar página siguiente
  });
  paginationContainer.appendChild(nextButton);
}
// Llamar a la función principal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);