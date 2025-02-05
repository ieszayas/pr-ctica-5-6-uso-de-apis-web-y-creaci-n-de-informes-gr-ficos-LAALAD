// Obtener el botón Limpiar y el Toast
const formulario = document.getElementById('novedadesForm');
const enviarFormularioBtn = document.getElementById('enviarFormulario');
//const toastEnviar = new bootstrap.Toast(document.getElementById('toastEnviar'));
const toastEnviar = new bootstrap.Toast(document.getElementById('toastEnviar'), { autohide: true, delay: 4000 });
let formIsValid = true;


// Validar nombre (sin números ni caracteres especiales)
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const nombreRegex = /^[A-Za-z\s]+$/;
const apellidoRegex = /^[A-Za-z\s]+$/;

function validadoNombre() {
    if (!nombre.value.match(nombreRegex)) {
        document.getElementById("error-nombre").textContent = "El nombre solo puede contener letras y espacios.";
        return false;
    } else {
        document.getElementById("error-nombre").textContent = "";
        return true;
    }
}

function validadoApellido() {
    if (!apellido.value.match(apellidoRegex)) {
        document.getElementById("error-apellido").textContent = "El apellido solo puede contener letras y espacios.";
        return false;
    } else {
        document.getElementById("error-apellido").textContent = "";
        return true;
    }
}

// Validar al menos un checkbox seleccionado
const interesEstrenos = document.getElementById("interesEstrenos");
const interesRecomendaciones = document.getElementById("interesRecomendaciones");
const interesNoticias = document.getElementById("interesNoticias");

function validadoIntereses() {
    if (!interesEstrenos.checked && !interesRecomendaciones.checked && !interesNoticias.checked) {
        document.getElementById("error-intereses").textContent = "Debes seleccionar al menos un interés.";
        return false;
    } else {
        document.getElementById("error-intereses").textContent = "";
        return true;
    }

}


// Validar fecha de nacimiento (rango de edades)
const fechaNacimiento = document.getElementById("fechaNacimiento");
const fecha = new Date(fechaNacimiento.value);
const fechaActual = new Date();
const edad = fechaActual.getFullYear() - fecha.getFullYear();

function validadoFecha() {
    if (edad < 18 || edad > 100) {
        document.getElementById("error-fechaNacimiento").textContent = "La edad debe estar entre 18 y 100 años.";
        return false;
    } else {
        document.getElementById("error-fechaNacimiento").textContent = "";
        return true;
    }
}

// Validar género
const genero = document.getElementById("genero");

function validadoGenero() {
    if (genero.value === "") {
        document.getElementById("error-genero").textContent = "Debes seleccionar un género.";
        return false;
    } else {
        document.getElementById("error-genero").textContent = "";
        return true;
    }
}

// Validar aceptación de términos
const terminos = document.getElementById("terminos");

function validadoTerminos() {
    if (!terminos.checked) {
        document.getElementById("error-terminos").textContent = "Debes aceptar los términos y condiciones.";
        return false;
    } else {
        document.getElementById("error-terminos").textContent = "";
        return true;
    }
}

// Evento para enviar el formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const esNombreValido = validadoNombre();
    const esApellidoValido = validadoApellido();
    const esInteresesValido = validadoIntereses();
    const esFechaValida = validadoFecha();
    const esGeneroValido = validadoGenero();
    const esTerminosValido = validadoTerminos();

    if (esNombreValido && esApellidoValido && esInteresesValido && esGeneroValido && esFechaValida && esTerminosValido) {
        const toastEnviar = new bootstrap.Toast(document.getElementById('toastEnviar'));
        toastEnviar.show();
        formulario.reset(); // Limpia el formulario

    }
});

// Validación en tiempo real
nombre.addEventListener('input', validadoNombre);
apellido.addEventListener('input', validadoApellido);
interesEstrenos.addEventListener('input', validadoIntereses);
interesRecomendaciones.addEventListener('input', validadoIntereses);
interesNoticias.addEventListener('input', validadoIntereses);
fechaNacimiento.addEventListener('input', validadoFecha);
genero.addEventListener('input', validadoGenero);
terminos.addEventListener('input', validadoTerminos);