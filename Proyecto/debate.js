// Referencias al formulario y a la lista de debates
const debateForm = document.getElementById("debateForm");
const debatesList = document.getElementById("debatesList");

// Cargar debates desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    // Obtener los debates almacenados en localStorage
    const storedDebates = JSON.parse(localStorage.getItem("debates"));
    if (storedDebates) {
        // Si hay debates almacenados, mostrar cada uno de ellos
        storedDebates.forEach((debate, index) => {
            displayDebate(debate.title, debate.content, debate.comments, index);
        });
    }
});

// Manejar el envío del formulario para crear un nuevo debate
debateForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario (recarga de la página)

    // Obtener los datos del formulario: Título y contenido del debate
    const debateTitle = document.getElementById("debateTitle").value;
    const debateContent = document.getElementById("debateContent").value;

    // Validación del título: Si está vacío, mostrar una alerta
    if (!debateTitle.trim()) {
        alert("Por favor, ingresa un título para el debate.");
        return;
    }

    // Crear un nuevo objeto para el debate con comentarios vacíos
    const newDebate = {
        title: debateTitle,
        content: debateContent,
        comments: []  // Comentarios vacíos al principio
    };

    // Mostrar el nuevo debate en la lista de debates
    displayDebate(newDebate.title, newDebate.content, newDebate.comments, debatesList.children.length);

    // Guardar todos los debates (incluyendo el nuevo) en localStorage
    saveDebatesToLocalStorage();

    // Limpiar los campos del formulario después de enviar el debate
    debateForm.reset();
});

// Función para mostrar un debate en la lista de debates
function displayDebate(title, content, comments, debateIndex) {
    // Crear un nuevo elemento de lista (<li>) para el debate
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "flex-column", "justify-content-between", "align-items-start", "mb-3", "mt-3");

    // Estructura HTML del debate (incluye título, contenido, caja para comentar y lista de comentarios)
    li.innerHTML = `
        <h5>${title}</h5>  <!-- Muestra el título del debate -->
        <p>${content}</p>  <!-- Muestra el contenido del debate -->
        
        <!-- Caja para Comentar -->
        <div class="mb-3" id="commentSection-${debateIndex}">
            <textarea class="form-control" id="commentContent-${debateIndex}" rows="3" cols="100" placeholder="Escribe tu comentario aquí..."></textarea>
        </div>
        <button class="btn btn-primary" onclick="addComment(${debateIndex})">Comentar</button>  <!-- Botón para enviar el comentario -->
        
        <!-- Lista de comentarios -->
        <ul id="commentsList-${debateIndex}" class="list-group mt-3">
            ${comments.map(comment => `<li class="list-group-item">${comment}</li>`).join('')}
        </ul>
    `;

    // Agregar el nuevo debate (el <li>) a la lista de debates en la interfaz de usuario
    debatesList.appendChild(li);
}

// Función para agregar un comentario a un debate específico
function addComment(debateIndex) {
    // Obtener el contenido del comentario
    const commentContent = document.getElementById(`commentContent-${debateIndex}`).value;
    
    // Validación: Si el comentario está vacío, mostrar una alerta
    if (commentContent.trim() === "") {
        alert("Por favor ingresa un comentario");
        return;
    }

    // Obtener los debates almacenados en localStorage
    const storedDebates = JSON.parse(localStorage.getItem("debates"));
    
    // Agregar el nuevo comentario al array de comentarios del debate correspondiente
    storedDebates[debateIndex].comments.push(commentContent);

    // Actualizar la lista de debates en localStorage para incluir el nuevo comentario
    localStorage.setItem("debates", JSON.stringify(storedDebates));

    // Agregar el comentario a la interfaz de usuario en el lugar correspondiente
    const commentList = document.getElementById(`commentsList-${debateIndex}`);
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = commentContent;
    commentList.appendChild(li);

    // Limpiar el campo de comentario después de enviarlo
    document.getElementById(`commentContent-${debateIndex}`).value = "";
}

// Función para guardar todos los debates (con sus comentarios) en localStorage
function saveDebatesToLocalStorage() {
    const debates = [];
    // Obtener todos los elementos <li> que contienen los debates
    const debateItems = debatesList.querySelectorAll("li");

    // Recorrer todos los debates y extraer la información
    debateItems.forEach((debateItem, index) => {
        const title = debateItem.querySelector("h5").textContent;  // Obtener el título
        const content = debateItem.querySelector("p").textContent;  // Obtener el contenido
        const comments = [];

        // Extraer todos los comentarios del debate
        const commentItems = debateItem.querySelectorAll(`#commentsList-${index} li`);
        commentItems.forEach(commentItem => {
            comments.push(commentItem.textContent);
        });

        // Agregar el debate con sus comentarios al array
        debates.push({
            title: title,
            content: content,
            comments: comments
        });
    });

    // Guardar todos los debates (con sus comentarios) en localStorage
    localStorage.setItem("debates", JSON.stringify(debates));
}
