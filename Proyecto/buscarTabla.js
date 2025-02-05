function searchTable() {
    // Obtener el valor del campo de búsqueda
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();  // Convierte el valor a mayúsculas para hacer la búsqueda insensible a mayúsculas/minúsculas
    var table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");

    // Iterar a través de las filas de la tabla
    for (var i = 1; i < rows.length; i++) {  // Empezamos desde 1 para omitir la fila del encabezado
        var cells = rows[i].getElementsByTagName("td");
        var match = false;

        // Iterar a través de las celdas de cada fila
        for (var j = 0; j < cells.length; j++) {
            if (cells[j]) {
                var text = cells[j].textContent || cells[j].innerText;
                if (text.toUpperCase().indexOf(filter) > -1) {
                    match = true;
                    break;  // Si encontramos una coincidencia, salimos del bucle
                }
            }
        }

        // Mostrar u ocultar la fila dependiendo de si hay una coincidencia
        if (match) {
            rows[i].style.display = "";  // Mostrar la fila
        } else {
            rows[i].style.display = "none";  // Ocultar la fila
        }
    }
}
