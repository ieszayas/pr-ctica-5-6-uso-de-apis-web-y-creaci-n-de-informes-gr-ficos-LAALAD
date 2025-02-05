// Función que actualiza la hora
function actualizarReloj() {
    const reloj = document.getElementById('reloj');
    
    // Obtén la fecha y hora actual
    const fecha = new Date();
    
    // Obtener las horas, minutos y segundos
    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
    
    // Añadir un 0 a la izquierda si los minutos o segundos son menores de 10
    horas = horas < 10 ? '0' + horas : horas;
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
    
    // Mostrar la hora en formato de 24 horas
    reloj.textContent = horas + ':' + minutos + ':' + segundos;
}

// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);

// Llamar a la función una vez al cargar la página para mostrar la hora inmediatamente
actualizarReloj();
