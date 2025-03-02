// Se define la API key para hacer peticiones a TMDb
const apiKey = '481efa3a785d32762bce6a0f1319b1ac'; // Sustituye con tu propia API Key de TMDb

// Se intenta recuperar el 'wishlist' desde el almacenamiento local (localStorage)
// Si no existe, se inicializa con un array vacío.
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []; 

console.log("Wishlist cargado"); // Solo imprime un mensaje en consola para verificar que el código está cargado.

// Función para buscar películas en la API
async function searchMovies() {
    // Se obtiene el valor del input del buscador y se elimina cualquier espacio extra al principio o final.
    const query = document.getElementById('movie-search').value.trim();

    // Si el input está vacío, no se hace nada y se limpia el contenedor de resultados.
    if (!query) {
        document.getElementById('movie-results').innerHTML = '';
        return;
    }

    // Se hace una petición a la API de TMDb usando el 'query' como término de búsqueda.
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=es-ES`);
    const data = await response.json(); // Convierte la respuesta en formato JSON

    // Si hay resultados, se muestran las películas, de lo contrario, se muestra un mensaje indicando que no se encontraron resultados.
    if (data.results && data.results.length > 0) {
        displayMovieResults(data.results);
    } else {
        document.getElementById('movie-results').innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
    }
}

// Función para mostrar los resultados de la búsqueda
function displayMovieResults(movies) {
    const resultsContainer = document.getElementById('movie-results'); // Contenedor donde se mostrarán las películas
    resultsContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar nuevos resultados

    // Recorre las películas obtenidas de la API y las muestra en el contenedor
    movies.forEach(movie => {
        // Crea un nuevo elemento div para cada película
        const movieElement = document.createElement('div');
        movieElement.classList.add('card', 'mb-3', 'col-md-3');// Añade clases para estilo

        // Si la película tiene un póster, lo usa, sino usa una imagen de marcador de posición
        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
        
        // Define el HTML del elemento con la información de la película (imagen, título, año y botón para agregar a wishlist)
        movieElement.innerHTML = `
            <img src="${moviePoster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Año: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                <button class="btn btn-primary" onclick="addToWishlist('${movie.id}', '${movie.title}', '${moviePoster}')">Agregar al Wishlist</button>
            </div>
        `;
        // Añade la película al contenedor de resultados
        resultsContainer.appendChild(movieElement);
    });
}

// Función para agregar una película al wishlist
function addToWishlist(movieId, title, poster) {
    // Crea un objeto para representar la película que se agregará
    const movie = {
        movieId,
        title,
        poster
    };

    // Verifica si la película ya existe en el wishlist
    if (wishlist.find(item => item.movieId === movieId)) {
        alert('Esta película ya está en tu Wishlist.'); // Si ya está, muestra un mensaje de alerta
        return; // Sale de la función sin agregarla
    }

    // Si no está en el wishlist, la agrega
    wishlist.push(movie);

    // Guarda el nuevo wishlist en localStorage para que persista entre recargas
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Muestra el wishlist actualizado
    displayWishlist();
}

// Función para mostrar el Wishlist
function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container'); // Contenedor del wishlist
    wishlistContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar las películas

    // Si el wishlist está vacío, muestra un mensaje
    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p class="text-center">Tu wishlist está vacío.</p>';
        return; // Termina la función si no hay elementos en el wishlist
    }

    // Si hay elementos en el wishlist, los muestra
    wishlist.forEach(movie => {
        // Crea un nuevo elemento div para cada película en el wishlist
        const movieElement = document.createElement('div');
        movieElement.classList.add('card', 'mb-3'); // Añade clases para estilo

        // Define el HTML del elemento con la información de la película (imagen y título)
        movieElement.innerHTML = `
            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <button class="btn btn-danger" onclick="removeFromWishlist('${movie.movieId}')">Eliminar del Wishlist</button>
            </div>
        `;
        // Añade la película al contenedor de wishlist
        wishlistContainer.appendChild(movieElement);
    });
}

// Función para eliminar una película del Wishlist
function removeFromWishlist(movieId) {
    // Busca el índice de la película que se quiere eliminar
    const movieIndex = wishlist.findIndex(item => item.movieId === movieId);

    // Si la película existe en el wishlist
    if (movieIndex !== -1) {
        wishlist.splice(movieIndex, 1); // Elimina la película del array

        // Guarda el wishlist actualizado en localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Muestra el wishlist actualizado después de la eliminación
        displayWishlist();
    }
}

// Llamada inicial para mostrar el Wishlist cargado desde localStorage cuando se cargue la página
document.addEventListener('DOMContentLoaded', displayWishlist);
