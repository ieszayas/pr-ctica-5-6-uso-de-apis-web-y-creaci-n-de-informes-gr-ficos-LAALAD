// Obtener el botón Limpiar y el Toast
const limpiarFormularioBtn = document.getElementById('limpiarFormulario');
const toast = new bootstrap.Toast(document.getElementById('toast'));

// Función para manejar el evento de limpiar
limpiarFormularioBtn.addEventListener('click', function () {
    // Mostrar el Toast
    toast.show();
});
