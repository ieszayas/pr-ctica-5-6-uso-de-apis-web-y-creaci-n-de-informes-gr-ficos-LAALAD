const apiKey = '481efa3a785d32762bce6a0f1319b1ac'; 

// 🔥 API para obtener las películas más recientes
const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es-ES&page=1`;

async function fetchRecentMovies() {
    try {
        console.log("Obteniendo películas recientes...");
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const movies = data.results.slice(0, 10); // Tomamos solo las 10 más recientes

            // Extraer nombres y calificaciones
            const movieTitles = movies.map(movie => movie.title);
            const movieRatings = movies.map(movie => movie.vote_average);

            console.log("Películas obtenidas:", movieTitles);

            // Dibujar el gráfico con los datos obtenidos
            drawChart(movieTitles, movieRatings);
        } else {
            console.error("No se encontraron películas recientes.");
        }
    } catch (error) {
        console.error("Error al obtener los datos de la API: ", error);
    }
}

// 📊 Función para dibujar el gráfico con Chart.js
function drawChart(labels, data) {
    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels, // Nombres de las películas
            datasets: [{
                label: 'Calificación Promedio',
                data: data, // Calificaciones de las películas
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10, // Escala de calificaciones (de 0 a 10)
                    title: {
                        display: true,
                        text: 'Calificación Promedio'
                    }
                }
            }
        }
    });
}

//  Ejecutar la función al cargar la página
fetchRecentMovies();
