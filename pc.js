import {
    apiKeyRawg,
    baseUrl,
    pageSize,
    genresES,
    getGameDetails,
    getGames,
    getGenres,
    juegosMostrados,
    getMainPlatform,
    groupedPlatforms
} from './api.js';
import { translateHtml, translateText } from './translations.js';
import { translateSynopsis } from './gameTranslations.js';

async function createGameElement(game) {
    console.log('Creando elemento para el juego:', game.name);
    
    // Verificar si el juego ya fue mostrado en una plataforma con mayor prioridad
    if (juegosMostrados.has(game.id)) {
        console.log('Juego ya mostrado:', game.name);
        return null;
    }

    // Verificar si el juego está disponible en PC
    const isPC = game.platforms && game.platforms.some(platform => 
        groupedPlatforms['PC'].some(p => p.name === platform.platform.name)
    );
    
    if (!isPC) {
        console.log('Juego no disponible en PC:', game.name);
        return null;
    }

    console.log('Creando elemento HTML para:', game.name);
    const gameDiv = document.createElement('div');
    gameDiv.classList.add('juego');
    gameDiv.dataset.gameId = game.id;

    // Crear imagen del juego
    const image = document.createElement('img');
    image.src = game.background_image || 'imagen_por_defecto.jpg';
    image.alt = game.name;
    gameDiv.appendChild(image);

    // Crear contenedor de información
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info-juego');
    gameDiv.appendChild(infoDiv);

    // Título del juego
    const title = document.createElement('h3');
    title.textContent = game.name;
    infoDiv.appendChild(title);

    // Géneros del juego
    if (game.genres && game.genres.length > 0) {
        const translatedGenres = game.genres.map(g => genresES[g.slug] || g.name);
        const genreElement = document.createElement('p');
        genreElement.textContent = `Géneros: ${translatedGenres.join(', ')}`;
        infoDiv.appendChild(genreElement);
    }

    try {
        // Obtener y mostrar detalles del juego
        const gameDetails = await getGameDetails(game.id);
        if (gameDetails && gameDetails.description) {
            // Descripción traducida usando el diccionario local
            const descripcionOriginal = translateSynopsis(gameDetails.description);
            const descripcionSinHtml = descripcionOriginal.replace(/<[^>]+>/g, '');
            const palabrasDescripcion = descripcionSinHtml.split(/\s+/);

            const maxPalabras = 50;
            const descripcionCorta = palabrasDescripcion.slice(0, maxPalabras).join(' ');

            const description = document.createElement('p');
            description.textContent = descripcionCorta + (palabrasDescripcion.length > maxPalabras ? '...' : '');
            infoDiv.appendChild(description);

            // Botón "Leer más"
            if (palabrasDescripcion.length > maxPalabras) {
                const leerMasLink = document.createElement('a');
                leerMasLink.href = '#';
                leerMasLink.textContent = 'Leer más';
                leerMasLink.classList.add('leer-mas');

                leerMasLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    description.textContent = descripcionSinHtml;
                    leerMasLink.remove();
                });

                infoDiv.appendChild(leerMasLink);
            }

            // Plataformas disponibles
            if (gameDetails.platforms && gameDetails.platforms.length > 0) {
                const platformNames = gameDetails.platforms.map(p => p.platform.name);
                const platformElement = document.createElement('p');
                platformElement.textContent = `Plataformas: ${platformNames.join(', ')}`;
                infoDiv.appendChild(platformElement);
            }
        }
    } catch (error) {
        console.error('Error al obtener detalles del juego:', error);
    }

    // Marcar el juego como mostrado
    juegosMostrados.add(game.id);
    window.lastShownPlatform[game.id] = 'PC';
    console.log('Juego agregado exitosamente:', game.name);

    return gameDiv;
}

async function loadGames(genreId, page = 1) {
    console.log('Cargando juegos para género:', genreId, 'página:', page);
    const platformIds = groupedPlatforms['PC'].map(p => p.id);
    console.log('IDs de plataforma:', platformIds);
    
    try {
        const data = await getGames(platformIds, genreId, page);
        console.log('Datos de juegos recibidos:', data);
        
        const genres = await getGenres();
        const genre = genres.find(g => g.id === genreId);
        if (!genre) {
            console.error(`No se encontró el género con ID ${genreId}`);
            return;
        }
        
        const categorySectionId = `pc-${genre.slug}`;
        console.log('ID de sección:', categorySectionId);
        
        const gameList = document.getElementById(categorySectionId)?.querySelector('.lista-juegos');
        if (!gameList) {
            console.error(`No se encontró la lista de juegos para la categoría ${categorySectionId}`);
            return;
        }

        console.log('Agregando juegos a la lista...');
        for (const game of data.results) {
            const gameElement = await createGameElement(game);
            if (gameElement) {
                gameList.appendChild(gameElement);
                console.log('Juego agregado:', game.name);
            }
        }

        updatePagination(categorySectionId, genreId, page, data.next);
    } catch (error) {
        console.error('Error al cargar juegos:', error);
    }
}

function updatePagination(categorySectionId, genreId, currentPage, nextPageUrl) {
    const paginationContainer = document.getElementById(`${categorySectionId}-pagination`);
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => loadGames(genreId, currentPage - 1));
    paginationContainer.appendChild(prevButton);

    const pageSpan = document.createElement('span');
    pageSpan.textContent = `Página ${currentPage}`;
    paginationContainer.appendChild(pageSpan);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Cargar más juegos';
    nextButton.disabled = !nextPageUrl;
    nextButton.addEventListener('click', () => loadGames(genreId, currentPage + 1));
    paginationContainer.appendChild(nextButton);
}

async function main() {
    console.log('Iniciando carga de juegos de PC...');
    try {
        const genres = await getGenres();
        console.log('Géneros obtenidos:', genres);
        
        const contenidoJuegos = document.getElementById('contenido-juegos');
        if (!contenidoJuegos) {
            console.error('No se encontró el elemento contenido-juegos');
            return;
        }

        for (const genre of genres) {
            console.log('Procesando género:', genre.name);
            const categorySectionId = `pc-${genre.slug}`;
            
            const categorySection = document.createElement('section');
            categorySection.id = categorySectionId;

            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = genresES[genre.slug] || genre.name;
            categorySection.appendChild(categoryTitle);

            const gameList = document.createElement('div');
            gameList.classList.add('lista-juegos');
            categorySection.appendChild(gameList);

            const paginationContainer = document.createElement('div');
            paginationContainer.id = `${categorySectionId}-pagination`;
            categorySection.appendChild(paginationContainer);

            contenidoJuegos.appendChild(categorySection);

            // Cargar juegos para este género
            await loadGames(genre.id);
        }
    } catch (error) {
        console.error('Error en la función main:', error);
    }
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', main);
  