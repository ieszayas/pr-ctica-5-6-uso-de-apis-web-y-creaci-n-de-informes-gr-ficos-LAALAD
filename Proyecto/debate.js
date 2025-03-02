// Referencias al formulario y a la lista de debates
const debateForm = document.getElementById("debateForm");
const debatesList = document.getElementById("debatesList");

// Cargar debates desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const storedDebates = JSON.parse(localStorage.getItem("debates"));
    if (storedDebates) {
        storedDebates.forEach((debate, index) => {
            displayDebate(debate.title, debate.content, debate.comments, index);
        });
    }
});

// Manejar el envío del formulario para crear un nuevo debate
debateForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Obtener los datos del formulario
    const debateTitle = document.getElementById("debateTitle").value;
    const debateContent = document.getElementById("debateContent").value;

    // Validación del título
    if (!debateTitle.trim()) {
        alert("Por favor, ingresa un título para el debate.");
        return;
    }

    // Crear un nuevo objeto para el debate
    const newDebate = {
        title: debateTitle,
        content: debateContent,
        comments: []  // Comentarios vacíos al principio
    };

    // Mostrar el nuevo debate en la lista
    displayDebate(newDebate.title, newDebate.content, newDebate.comments, debatesList.children.length);

    // Guardar todos los debates en localStorage
    saveDebatesToLocalStorage();

    // Limpiar los campos del formulario
    debateForm.reset();
});

// Función para mostrar un debate en la lista
function displayDebate(title, content, comments, debateIndex) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "flex-column", "justify-content-between", "align-items-start", "mb-3", "mt-3");

    // Estructura HTML que se añadirá al <li>: Título, Contenido, Caja para Comentar y Lista de Comentarios
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

    // Agregar el nuevo debate (el <li>) a la lista de debates
    debatesList.appendChild(li);
}

// Función para agregar un comentario a un debate específico
function addComment(debateIndex) {
    const commentContent = document.getElementById(`commentContent-${debateIndex}`).value;
    
    // Validación: Si el comentario está vacío, mostrar una alerta
    if (commentContent.trim() === "") {
        alert("Por favor ingresa un comentario");
        return;
    }

    // Obtener los debates desde localStorage
    const storedDebates = JSON.parse(localStorage.getItem("debates"));
    
    // Agregar el comentario al debate correspondiente
    storedDebates[debateIndex].comments.push(commentContent);

    // Actualizar la lista de debates en localStorage
    localStorage.setItem("debates", JSON.stringify(storedDebates));

    // Agregar el comentario a la interfaz de usuario
    const commentList = document.getElementById(`commentsList-${debateIndex}`);
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = commentContent;
    commentList.appendChild(li);

    // Limpiar el campo de comentario después de enviarlo
    document.getElementById(`commentContent-${debateIndex}`).value = "";
}

// Función para guardar todos los debates en localStorage
function saveDebatesToLocalStorage() {
    const debates = [];
    const debateItems = debatesList.querySelectorAll("li");

    // Recorrer los debates y extraer la información
    debateItems.forEach((debateItem, index) => {
        const title = debateItem.querySelector("h5").textContent;
        const content = debateItem.querySelector("p").textContent;
        const comments = [];

        // Extraer los comentarios
        const commentItems = debateItem.querySelectorAll(`#commentsList-${index} li`);
        commentItems.forEach(commentItem => {
            comments.push(commentItem.textContent);
        });

        debates.push({
            title: title,
            content: content,
            comments: comments
        });
    });

    // Guardar los debates en localStorage
    localStorage.setItem("debates", JSON.stringify(debates));
}
