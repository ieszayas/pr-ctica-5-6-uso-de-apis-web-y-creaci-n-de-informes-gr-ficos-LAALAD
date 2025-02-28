const apiKey = '481efa3a785d32762bce6a0f1319b1ac'; // Sustituye con tu propia API Key de TMDb
const wishlist = [];

// Función para buscar películas
async function searchMovies() {
    const query = document.getElementById('movie-search').value;

    if (!query) return;

    // Llamada a la API de TMDb para buscar películas
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=es-ES`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
        displayMovieResults(data.results);
    } else {
        document.getElementById('movie-results').innerHTML = '<p class="text-center">No se encontraron resultados.</p>';
    }
}

// Función para mostrar los resultados de la búsqueda
function displayMovieResults(movies) {
    const resultsContainer = document.getElementById('movie-results');
    resultsContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('card', 'mb-3', 'col-md-4');
        const moviePoster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';
        
        movieElement.innerHTML = `
            <img src="${moviePoster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Año: ${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                <button class="btn btn-primary" onclick="addToWishlist('${movie.id}', '${movie.title}', '${moviePoster}')">Agregar al Wishlist</button>
            </div>
        `;
        resultsContainer.appendChild(movieElement);
    });
}

// Función para agregar una película al wishlist
function addToWishlist(movieId, title, poster) {
    // Crear un objeto de película
    const movie = {
        movieId,
        title,
        poster
    };

    // Verificar si la película ya está en el wishlist
    if (wishlist.find(item => item.movieId === movieId)) {
        alert('Esta película ya está en tu Wishlist.');
        return;
    }

    // Agregar la película al array de wishlist
    wishlist.push(movie);
    displayWishlist();
}

// Función para mostrar el Wishlist
function displayWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p class="text-center">Tu wishlist está vacío.</p>';
        return;
    }

    wishlist.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('card', 'mb-3', 'col-md-4');
        movieElement.innerHTML = `
            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <button class="btn btn-danger" onclick="removeFromWishlist('${movie.movieId}')">Eliminar del Wishlist</button>
            </div>
        `;
        wishlistContainer.appendChild(movieElement);
    });
}

// Función para eliminar una película del Wishlist
function removeFromWishlist(movieId) {
    const movieIndex = wishlist.findIndex(item => item.movieId === movieId);
    if (movieIndex !== -1) {
        wishlist.splice(movieIndex, 1);
        displayWishlist();
    }
}

// Llamada inicial para mostrar el Wishlist cargado
document.addEventListener('DOMContentLoaded', displayWishlist);
