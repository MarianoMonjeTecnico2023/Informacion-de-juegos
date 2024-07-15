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
  
              gameDiv.appendChild(requirementsDiv); 
          }
      }
  
      return gameDiv;
  }
  
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
    const platformIds = [4, 5, 6];
    const contenidoJuegos = document.getElementById('contenido-juegos');
  
    for (const genre of genres) {
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
  
        await loadGames(genre.id, 1);
    }
  
    async function loadGames(genreId, page = 1) {
      const data = await getGames(platformIds, genreId, page); 
      const categorySectionId = `pc-${genres.find(g => g.id === genreId).slug}`;
      const gameList = document.getElementById(categorySectionId)?.querySelector('.lista-juegos');
  
      if (!gameList) {
          console.error(`No se encontró la lista de juegos para la categoría ${categorySectionId}`);
          return;
      }
  
      for (const game of data.results) {
          if (!juegosMostrados.has(game.id) && 
              game.genres.some(g => g.id === genreId) && 
              game.platforms.some(p => platformIds.includes(p.platform.id))) {
              const gameElement = await createGameElement(game);
              if (gameElement) {
                  gameList.appendChild(gameElement);
                  juegosMostrados.add(game.id);
              }
          }
      }
  
      updatePagination(categorySectionId, genreId, page, data.next);
    }
  
    function updatePagination(categorySectionId, genreId, currentPage, nextPageUrl) {
        const paginationContainer = document.getElementById(`${categorySectionId}-pagination`);
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
  }
  
  document.addEventListener('DOMContentLoaded', main);
  