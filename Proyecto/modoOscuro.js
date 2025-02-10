document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los elementos relevantes
    const modoOscuroBtn = document.getElementById('modoOscuroBtn');
    const body = document.body;    
    const navbar = document.querySelector('.navbar');
    const landingPageSection = document.querySelector('.miColorCabecera');
    const footer = document.querySelector('.miColorFoot');
    const servicios = document.querySelectorAll('.contenedor-servicios'); // Todos los elementos con esta clase
    const tableRows = document.querySelectorAll('.table-striped tbody tr'); // Filas de la tabla
    const tableCells = document.querySelectorAll('.table-striped td, .table-striped th'); // Celdas de la tabla
    const formulario = document.getElementById('prueba')


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
        navbar.classList.toggle('dark-mode');
        footer.classList.toggle('dark-mode');


        landingPageSection.classList.toggle('dark-mode');
        servicios.forEach(servicio => servicio.classList.toggle('dark-mode'));
        tableRows.forEach(row => row.classList.toggle('dark-mode'));
        tableCells.forEach(cell => cell.classList.toggle('dark-mode'));
        formulario.classList.toggle('dark-mode');

    });
    if (modoOscuro) {
        // Cambiar el texto del botón a 'Modo Claro'
        modoOscuroBtn.textContent = 'Modo Claro';
        // Si el modo oscuro está activado, añadir la clase dark-mode a los elementos
        body.classList.add('dark-mode');
        footer.classList.add('dark-mode');

        navbar.classList.add('dark-mode');
        landingPageSection.classList.add('dark-mode');
        servicios.forEach(servicio => servicio.classList.add('dark-mode'));
        tableRows.forEach(row => row.classList.add('dark-mode'));
        tableCells.forEach(cell => cell.classList.add('dark-mode'));
        
        formulario.classList.add('dark-mode');
    } else {
        // Si el modo oscuro no está activado, cambiar el texto del botón a 'Modo Oscuro'
        modoOscuroBtn.textContent = 'Modo Oscuro';
    }

});
