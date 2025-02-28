document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los elementos relevantes
    const modoOscuroBtn = document.getElementById('modoOscuroBtn');
    const table = document.getElementById('myTable'); // Tabla completa
    const tableRows = document.querySelectorAll('#myTable tr'); // Filas de la tabla
    const tableCells = document.querySelectorAll('#myTable td, #myTable th'); // Celdas de la tabla

    // Recuperar el estado del modo oscuro desde el localStorage
    const modoOscuro = localStorage.getItem('modoOscuro') === 'true';

    // Alternar entre modos al hacer clic en el botón
    modoOscuroBtn.addEventListener('click', () => {
        const isDarkMode = table.classList.toggle('dark-mode'); // Solo aplicar a la tabla
        // Cambiar el texto del botón
        if (isDarkMode) {
            modoOscuroBtn.textContent = 'Modo Claro';
            localStorage.setItem('modoOscuro', 'true'); // Guardar preferencia en localStorage
        } else {
            modoOscuroBtn.textContent = 'Modo Oscuro';
            localStorage.setItem('modoOscuro', 'false'); // Guardar preferencia en localStorage
        }
        
        // Aplicar la clase dark-mode a las filas y celdas de la tabla
        tableRows.forEach(row => row.classList.toggle('dark-mode'));
        tableCells.forEach(cell => cell.classList.toggle('dark-mode'));
    });

    // Verificar si el modo oscuro está guardado en localStorage
    if (modoOscuro) {
        modoOscuroBtn.textContent = 'Modo Claro'; // Cambiar el texto del botón
        // Si el modo oscuro está activado, añadir la clase dark-mode a la tabla, filas y celdas
        table.classList.add('dark-mode');
        tableRows.forEach(row => row.classList.add('dark-mode'));
        tableCells.forEach(cell => cell.classList.add('dark-mode'));
    } else {
        modoOscuroBtn.textContent = 'Modo Oscuro'; // Cambiar el texto del botón
    }
});
