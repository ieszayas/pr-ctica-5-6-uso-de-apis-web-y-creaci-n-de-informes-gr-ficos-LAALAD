function changeTableColor() {
    // Obtener el valor del color seleccionado
    var color = document.getElementById("colorPicker").value;

    // Obtener la tabla y cambiar el color del fondo
    var table = document.getElementById("myTable");


    // Cambiar el color de fondo de la tabla
    table.style.backgroundColor = color;

    // Cambiar el color de las filas (tr) de la tabla
    var rows = table.querySelectorAll('tr');
    rows.forEach(function(row) {
        row.style.backgroundColor = color;
    });
}
