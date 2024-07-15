import {
    apiKeyRawg,
    baseUrl,
    pageSize,
    genresES,
    getGameDetails,
    getGames,
    getGenres,
    translateDescription,
    traducirParrafosEnLotes,
    translateParrafo,
    juegosMostrados
} from './api.js';

async function createGameElement(game) {
    const existingGameElement = document.querySelector(`.juego[data-game-id="${game.id}"]`);
    if (existingGameElement) {
        return null;
    }

    const gameDiv = document.createElement('div');
    gameDiv.classList.add('juego');
    gameDiv.dataset.gameId = game.id;

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

    const translatedGenres = game.genres.map(g => genresES[g.slug] || g.name);
    const genreElement = document.createElement('p');
    genreElement.textContent = `Géneros: ${translatedGenres.join(', ')}`;
    infoDiv.appendChild(genreElement);

    const gameDetails = await getGameDetails(game.id);

    if (gameDetails) {
        const translatedDescriptionHtml = await translateDescription(gameDetails.description);
        const descripcionOriginal = translatedDescriptionHtml || 'No hay descripción disponible.';
        const descripcionSinHtml = descripcionOriginal.replace(/<[^>]+>/g, '');
        const palabrasDescripcion = descripcionSinHtml.split(/\s+/);

        const maxPalabras = 50;
        const descripcionCorta = palabrasDescripcion.slice(0, maxPalabras).join(' ');
        let descripcionMostrada = descripcionCorta;

        const description = document.createElement('p');
        description.innerHTML = descripcionMostrada + (palabrasDescripcion.length > maxPalabras ? '...' : '');

        const leerMasLink = document.createElement('a');
        leerMasLink.href = '#';
        leerMasLink.textContent = 'Leer más';
        leerMasLink.classList.add('leer-mas');

        leerMasLink.addEventListener('click', (event) => {
            event.preventDefault();
            descripcionMostrada = descripcionOriginal;
            description.innerHTML = descripcionMostrada;
            leerMasLink.remove();
        });

        infoDiv.appendChild(description);
        if (palabrasDescripcion.length > maxPalabras) {
            infoDiv.appendChild(leerMasLink);
        }

        const platformNames = gameDetails.platforms.map(p => p.platform.name);
        const platformElement = document.createElement('p');
        platformElement.textContent = `Plataformas: ${platformNames.join(', ')}`;
        infoDiv.appendChild(platformElement);
    }

    return gameDiv;
}

async function main() {
    const genres = await getGenres(); // Obtenemos todos los géneros de la API
    const platformIds = [1, 186, 14,]; // IDs de plataformas de Play
    const contenidoJuegos = document.getElementById('contenido-juegos');
    // Creamos una sección para cada género de juego
    for (const genre of genres) {
       const categorySectionId = `nintendo-${genre.slug}`; // ID único para cada sección
       const categorySection = document.createElement('section');
       categorySection.id = categorySectionId;

       const categoryTitle = document.createElement('h3');
       categoryTitle.textContent = genresES[genre.slug] || genre.name; // Usamos el nombre traducido si existe, sino el original
       categorySection.appendChild(categoryTitle);

       const gameList = document.createElement('div'); // Contenedor para los juegos de esta categoría
       gameList.classList.add('lista-juegos');
       categorySection.appendChild(gameList);

       const paginationContainer = document.createElement('div'); // Contenedor para los botones de paginación
       paginationContainer.id = `${categorySectionId}-pagination`;
       categorySection.appendChild(paginationContainer);

       contenidoJuegos.appendChild(categorySection); // Agregamos la sección al contenedor principal

       // Cargamos los juegos de la primera página de esta categoría
       await loadGames(genre.id, 1);
   }

   async function loadGames(genreId, page = 1) {
       const data = await getGames(platformIds.join(','), genreId, page); // Obtenemos los juegos de Nintendo del género y página especificados
       const categorySectionId = `nintendo-${genres.find(g => g.id === genreId).slug}`; // ID de la sección correspondiente
       const gameList = document.getElementById(categorySectionId)?.querySelector('.lista-juegos'); // Contenedor de juegos de la sección

       if (!gameList) {
           console.error(`No se encontró la lista de juegos para la categoría ${categorySectionId}`);
           return;
       }

       gameList.innerHTML = ''; // Limpiamos la lista antes de agregar nuevos juegos

       for (const game of data.results) {
           if (!juegosMostrados.has(game.id)) {
               const gameElement = await createGameElement(game);
               if (gameElement) {
                   gameList.appendChild(gameElement);
                   juegosMostrados.add(game.id);
               }
           }
       }

       updatePagination(categorySectionId, genreId, page, data.next); // Actualizamos la paginación
   }

   function updatePagination(categorySectionId, genreId, currentPage, nextPageUrl) {
       const paginationContainer = document.getElementById(`${categorySectionId}-pagination`);
       paginationContainer.innerHTML = ''; // Limpiamos la paginación anterior

       const prevButton = document.createElement('button');
       prevButton.textContent = 'Anterior';
       prevButton.disabled = currentPage === 1;
       prevButton.addEventListener('click', () => loadGames(genreId, currentPage - 1));
       paginationContainer.appendChild(prevButton);

       const pageSpan = document.createElement('span');
       pageSpan.textContent = `Página ${currentPage}`;
       paginationContainer.appendChild(pageSpan);

       const nextButton = document.createElement('button');
       nextButton.textContent = 'Siguiente';
       nextButton.disabled = !nextPageUrl;
       nextButton.addEventListener('click', () => loadGames(genreId, currentPage + 1));
       paginationContainer.appendChild(nextButton);
   }
}

document.addEventListener('DOMContentLoaded', main);