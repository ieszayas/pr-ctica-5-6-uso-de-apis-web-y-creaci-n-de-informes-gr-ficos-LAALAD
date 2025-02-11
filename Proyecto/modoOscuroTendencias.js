document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los elementos relevantes
    const modoOscuroBtn = document.getElementById('modoOscuroBtn');
    
    const tableRows = document.querySelectorAll('tr'); // Filas de la tabla
    const tableCells = document.querySelectorAll('td, th'); // Celdas de la tabla


    // Recuperar el estado del modo oscuro desde el localStorage
    const modoOscuro = localStorage.getItem('modoOscuro') === 'true';

    // Alternar entre modos al hacer clic en el botón
    modoOscuroBtn.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        // Cambiar el texto del botón
        if (isDarkMode) {
            modoOscuroBtn.textContent = 'Modo Claro';
            localStorage.setItem('modoOscuro', 'true'); // Guardar preferencia en localStorage
        } else {
            modoOscuroBtn.textContent = 'Modo Oscuro';
            localStorage.setItem('modoOscuro', 'false'); // Guardar preferencia en localStorage
        }
        
        tableRows.forEach(row => row.classList.toggle('dark-mode'));
        tableCells.forEach(cell => cell.classList.toggle('dark-mode'));
        

    });
    if (modoOscuro) {
        // Cambiar el texto del botón a 'Modo Claro'
        modoOscuroBtn.textContent = 'Modo Claro';
        // Si el modo oscuro está activado, añadir la clase dark-mode a los elementos
        tableRows.forEach(row => row.classList.add('dark-mode'));
        tableCells.forEach(cell => cell.classList.add('dark-mode'));
        
    } else {
        // Si el modo oscuro no está activado, cambiar el texto del botón a 'Modo Oscuro'
        modoOscuroBtn.textContent = 'Modo Oscuro';
    }

});
