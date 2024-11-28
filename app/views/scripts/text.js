// Configurar marked para que sea más seguro
marked.setOptions({
    sanitize: false, // Permitimos HTML para imágenes
    breaks: true
});

const editor = CodeMirror.fromTextArea(document.getElementById("markdown-editor"), {
    mode: "markdown",
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    tabSize: 2
});

// Actualizar preview en tiempo real
editor.on("change", () => {
    const markdownText = editor.getValue();
    const htmlContent = marked.parse(markdownText);
    document.getElementById("preview").innerHTML = htmlContent;
});

function insertFormat(type) {
    const selections = {
        bold: { text: '**texto en negrita**', start: 2, end: 17 },
        italic: { text: '*texto en cursiva*', start: 1, end: 16 },
        strike: { text: '~~texto tachado~~', start: 2, end: 15 },
        h1: { text: '# Título 1\n', start: 2, end: 9 },
        h2: { text: '## Título 2\n', start: 3, end: 10 },
        h3: { text: '### Título 3\n', start: 4, end: 11 },
        ul: { text: '- Elemento de lista\n', start: 2, end: 17 },
        ol: { text: '1. Elemento de lista\n', start: 3, end: 18 },
        task: { text: '- [ ] Tarea\n', start: 6, end: 11 },
        link: { text: '[texto del enlace](url)', start: 1, end: 15 },
        code: { text: '`código`', start: 1, end: 7 },
        quote: { text: '> Cita\n', start: 2, end: 6 }
    };

    const selection = selections[type];
    const doc = editor.getDoc();
    const cursor = doc.getCursor();

    doc.replaceSelection(selection.text);
    doc.setSelection(
        { line: cursor.line, ch: cursor.ch + selection.start },
        { line: cursor.line, ch: cursor.ch + selection.end }
    );
    editor.focus();
}

function showImageDialog() {
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    imageModal.show();
}

function insertImage() {
    const urlInput = document.getElementById('imageUrlInput');
    const fileInput = document.getElementById('imageFileInput');
    
    if (urlInput.value) {
        const imageMarkdown = `![imagen](${urlInput.value})`;
        const doc = editor.getDoc();
        doc.replaceSelection(imageMarkdown + '\n');
    } else if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imageMarkdown = `![imagen](${e.target.result})`;
            const doc = editor.getDoc();
            doc.replaceSelection(imageMarkdown + '\n');
        };
        
        reader.readAsDataURL(file);
    }

    bootstrap.Modal.getInstance(document.getElementById('imageModal')).hide();
    urlInput.value = '';
    fileInput.value = '';
}

async function guardarProyecto(event) {
    event.preventDefault();

    // Recuperar el contenido del editor
    const content = editor.getValue();

    // Recuperar datos del proyecto desde el localStorage
    const projectData = JSON.parse(localStorage.getItem('projectData'));
    if (!projectData) {
        alert("No se encontraron datos del proyecto en el almacenamiento local.");
        return;
    }

    let { title, banner, category, languages, projectClass, professor } = projectData;

    title = document.getElementById('projectTitle').value.trim();

    // Verificar si hay título
    if (!title) {
        const titleModal = new bootstrap.Modal(document.getElementById("titleModal"));
        titleModal.show();
        return;
    }

    // Verificar si hay categoría
    if (!category) {
        alert("Por favor, selecciona una categoría.");
        return;
    }

    // Verificar si hay token
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Debes iniciar sesión para guardar proyectos.");
        const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
        loginModal.show();
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/projectsHandler", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                content, 
                title, 
                banner, 
                category,
                languages,
                projectClass,
                professor
            }),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error:", errorData);
            alert(`Error: ${errorData.message || "No autorizado"}`);
            return;
        }

        const dataProjectJson = await response.json();
        sessionStorage.setItem('dataProject', JSON.stringify(dataProjectJson));
    
        alert("Proyecto guardado exitosamente");
    } catch (error) {
        console.error("Error al guardar el proyecto:", error);
        alert("Error en la conexión con el servidor.");
    }
}

function setTitleAndSave(event) {
    event.preventDefault();
    const modalTitleInput = document.getElementById("modalProjectTitle").value.trim();
    if (modalTitleInput) {
        document.getElementById("projectTitle").value = modalTitleInput; // Actualiza el título principal
        bootstrap.Modal.getInstance(document.getElementById("titleModal")).hide(); // Cierra el modal
        guardarProyecto(new Event("submit")); // Llama nuevamente a guardarProyecto
    } else {
        alert("Por favor, introduce un título antes de guardar.");
    }
}

// Cargar contenido guardado si existe
const contenidoGuardado = localStorage.getItem('markdown-content');
if (contenidoGuardado) {
    editor.setValue(contenidoGuardado);
}

document.getElementById('crearProyecto').addEventListener('click', () => {
    const modal = new bootstrap.Modal(document.getElementById('createProjectModal'));
    modal.show();
});

document.getElementById('saveProjectBtn').addEventListener('click', () => {
    const title = document.getElementById('projectTitleInput').value.trim();
    const category = document.getElementById('projectCategoryInput').value;
    const bannerFile = document.getElementById('projectBannerInput').files[0];
    
    // Obtener lenguajes seleccionados
    const languages = Array.from(document.querySelectorAll('input[type="checkbox"][id^="language"]:checked'))
        .map(checkbox => checkbox.value);
    
    const projectClass = document.getElementById('projectClassInput').value;
    const professor = document.getElementById('projectProfessorInput').value;

    // Validaciones
    if (!title) {
        alert('El título del proyecto es obligatorio.');
        return;
    }

    if (!category) {
        alert('Debes seleccionar una categoría.');
        return;
    }

    if (languages.length === 0) {
        alert('Debes seleccionar al menos un lenguaje.');
        return;
    }

    if (!projectClass) {
        alert('Debes seleccionar una clase.');
        return;
    }

    if (!professor) {
        alert('Debes seleccionar un profesor.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const bannerData = e.target.result;

        const projectData = {
            title,
            category,
            languages,
            projectClass,
            professor,
            banner: bannerData
        };

        // Guardar los datos en localStorage
        localStorage.setItem('projectData', JSON.stringify(projectData));

        document.getElementById('projectTitle').value = title;

        // Oculta el div de invitación y muestra los nuevos elementos
        document.querySelector('.invitacion').style.display = 'none';
        document.getElementById('canvitas').style.display = 'block'

        const modal = bootstrap.Modal.getInstance(document.getElementById('createProjectModal'));
        modal.hide();
    };

    if (bannerFile) {
        reader.readAsDataURL(bannerFile);
    } else {
        reader.onload({ target: { result: '' } }); // Manejo para casos sin imagen
    }
});
