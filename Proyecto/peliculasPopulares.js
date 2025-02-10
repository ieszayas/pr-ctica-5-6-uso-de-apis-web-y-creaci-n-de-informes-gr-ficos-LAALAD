document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "481efa3a785d32762bce6a0f1319b1ac"; // clave de API de TMDb
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let peliculas = data.results;
            let tabla = document.getElementById("tabla-peliculas");

            peliculas.forEach(pelicula => {
                let fila = `
                    <tr>
                        <td><img src="https://image.tmdb.org/t/p/w200${pelicula.poster_path}" 
                                 alt="${pelicula.title}" class="img-fluid rounded"></td>
                        <td>${pelicula.title}</td>
                        <td>${pelicula.release_date}</td>
                        <td class="fw-bold text-warning">⭐ ${pelicula.vote_average} </td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error("Error al obtener los datos:", error));
});
